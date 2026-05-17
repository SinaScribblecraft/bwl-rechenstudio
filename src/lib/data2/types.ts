// ---------------------------------------------------------------------------
// Formeln
// ---------------------------------------------------------------------------

export type SidebarTopic = {
	id: string;
	title: string;
	href: string;
};
export type CourseUnit = {
	id: string;
	title: string;
	icon: string;
	topics: SidebarTopic[];
};

export interface UnitMeta {
	title: string;
	icon: string;
}

/** Ein Symbol mit Erklärung in der Parameterlegende einer Formel */
export interface FormulaParam {
	/** LaTeX-Symbol, z.B. 'C_r' oder 'y^{opt}' */
	symbol: string;
	/** Bedeutung des Symbols in Prosa */
	description: string;
}

/** Das Ergebnis-Symbol der Formel (was wird damit berechnet?) */
export interface FormulaResult {
	symbol: string;
	description: string;
}

/** Eine benannte Formel — wird auf Topic-Ebene definiert und per ID referenziert */
export interface Formula {
	/** Eindeutiger Bezeichner innerhalb des Topics, z.B. 'andler' oder 'lagerkostensatz' */
	id: string;
	name: string;
	/** Die Formel als LaTeX-String */
	math: string;
	result?: FormulaResult;
	/** Legende der in der Formel verwendeten Symbole */
	params?: FormulaParam[];
}

// ---------------------------------------------------------------------------
// Gegebene Größen
// ---------------------------------------------------------------------------

/** Ein numerischer Gegebenen-Wert, z.B. R = 800 ME/Jahr */
export interface GivenValue {
	type: 'value';
	/** Bezeichner, der im descriptionTemplate als {symbol} referenziert wird */
	symbol: string;
	/** String erlaubt für Fälle wie '10%' oder wenn der Wert als Text dargestellt werden soll */
	value: number | string;
	/** Einheit, z.B. 'ME/Jahr'. Leer lassen wenn einheitenlos */
	unit?: string;
	/** Beschriftung in der aufklappbaren Gegeben-Tabelle */
	label: string;
}

/** Eine gegebene Funktion oder Gleichung, z.B. eine Produktionsfunktion */
export interface GivenFormula {
	type: 'formula';
	/** Bezeichner für Interpolation im descriptionTemplate, z.B. 'M' oder 'k' */
	symbol: string;
	/** Die gegebene Funktion als LaTeX-String */
	math: string;
	/** Beschriftung in der aufklappbaren Gegeben-Tabelle */
	label: string;
}

/** Discriminated Union — verwende item.type zur Unterscheidung */
export type GivenItem = GivenValue | GivenFormula;

// ---------------------------------------------------------------------------
// Tabellen
// ---------------------------------------------------------------------------

export interface DataTable {
	headers: string[];
	rows: (string | number)[][];
}

// ---------------------------------------------------------------------------
// Lösungsschritte
// ---------------------------------------------------------------------------

export type StepType = 'formula' | 'substitution' | 'calculation' | 'result';

export interface Step {
	/**
	 * - `formula`      → Formel hinschreiben / benennen
	 * - `substitution` → Werte einsetzen
	 * - `calculation`  → Zwischenrechnung
	 * - `result`       → Endergebnis der Teilaufgabe
	 */
	type: StepType;
	title: string;
	/** Erklärt warum dieser Schritt so gemacht wird */
	description?: string;
	/** LaTeX-String mit der konkreten Rechnung */
	math?: string;
	/** Optionale Tabelle als Zwischenergebnis (z.B. bei Prognose-Schritten) */
	dataTable?: DataTable;
}

// ---------------------------------------------------------------------------
// Teilaufgaben
// ---------------------------------------------------------------------------

export interface SubTask {
	/** Typischerweise 'a', 'b', 'c' */
	label: string;
	question: string;
	/** IDs der relevanten Formeln aus Topic.formulas */
	formulaRefs?: string[];
	/** Mindestens ein Schritt; letzter Schritt sollte type 'result' sein */
	steps: Step[];
}

// ---------------------------------------------------------------------------
// Aufgaben
// ---------------------------------------------------------------------------

export interface Exercise {
	title: string;
	/**
	 * Klausur-Fließtext mit {symbol}-Platzhaltern.
	 * Wird zur Laufzeit gegen given interpoliert.
	 * Beispiel: "Jahresbedarf: {R} {R.unit}, Zinssatz: {i_pct} %"
	 */
	descriptionTemplate: string;
	/** Single Source of Truth für alle gegebenen Größen */
	given: GivenItem[];
	/** Optionale Tabelle als Teil der Aufgabenstellung */
	inputTable?: DataTable | null;
	subTasks: SubTask[];
}

// ---------------------------------------------------------------------------
// Topic
// ---------------------------------------------------------------------------

export interface Topic {
	title: string;
	subtitle?: string;
	/** Alle Formeln dieses Aufgabentyps — IDs müssen eindeutig sein */
	formulas: Formula[];
	exercises: Exercise[];
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

/** Map von Aufgabentyp-ID zu Topic, z.B. { andler: {...}, gozinto: {...} } */
export type ExerciseData = Record<string, Topic>;

// ---------------------------------------------------------------------------
// Hilfsfunktionen für Discriminated Unions
// ---------------------------------------------------------------------------

export function isGivenValue(item: GivenItem): item is GivenValue {
	return item.type === 'value';
}

export function isGivenFormula(item: GivenItem): item is GivenFormula {
	return item.type === 'formula';
}

/** Interpoliert {symbol}-Platzhalter im descriptionTemplate gegen given */
export function interpolate(template: string, given: GivenItem[]): string {
	return template.replace(/\{(\w+)\}/g, (_, sym) => {
		const item = given.find((g) => g.symbol === sym);
		if (!item) return `{${sym}}`;
		if (isGivenFormula(item)) return `$${item.math}$`; // inline LaTeX
		return String(item.value);
	});
}

/** Löst formulaRefs einer SubTask gegen das Topic.formulas-Array auf */
export function resolveFormulaRefs(subTask: SubTask, topic: Topic): Formula[] {
	if (!subTask.formulaRefs) return [];
	return subTask.formulaRefs
		.map((id) => topic.formulas.find((f) => f.id === id))
		.filter((f): f is Formula => f !== undefined);
}
