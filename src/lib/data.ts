
export type DataTable = {
	headers: string[];
	rows: (string | number)[][];
};

export type SolutionStep = {
	title: string;
	description: string;
	math?: string;
	dataTable?: DataTable;
};

export type SubTask = {
	label: string;
	question: string;
	steps: SolutionStep[];
	finalResultText?: string;
	finalResultMath?: string;
};

export type ExerciseData = {
	title: string;
	description: string;
	formulas: FormulaDef[];
	dataTable?: DataTable;
	subTasks: SubTask[];
};

export type ParamDef = {
	symbol: string;
	description: string;
};

export type FormulaDef = {
	name: string;
	result: ParamDef;
	math: string;
	params: ParamDef[];
};




export const exerciseDatabase: Record<string, Record<string, ExerciseData>> = {
	ke1: {
		andler: {
			title: 'Optimale Bestellmenge (Andler)',
			description:
				'Möbelhändler „Zurwegen" hat einen Jahresbedarf von 800 Tischen. Einstandspreis: 400 € pro Tisch. Bestellfixe Kosten: 10 € pro Bestellung. Zinssatz: 10 % p.a.',

			// NEU: Unsere strukturierte Formel
			formulas: [
				{
					name: 'Andler-Formel (Grundmodell)',
					result: {
						symbol: 'y^{opt}',
						description: 'Optimale Bestellmenge'
					},
					math: 'y^{opt} = \\sqrt{\\frac{2 \\cdot R \\cdot C_r}{C_l}}',
					params: [
						{ symbol: 'R', description: 'Gesamtbedarf in Planperiode T' }, //
						{ symbol: 'C_r', description: 'bestellfixe Kosten pro Bestellung (€/Bestellung)' }, //
						{ symbol: 'C_l', description: 'Lagerkostensatz (€/(ME·ZE))' } //
					]
				},
				{
					name: 'Lagerkostensatz',
					result: { symbol: 'C_l', description: 'Lagerkosten pro Stück' },
					math: 'C_l = b \\cdot i + C_{lm}',
					params: [
						{ symbol: 'b', description: 'Einstandspreis pro ME (€/ME)' }, //
						{ symbol: 'i', description: 'Zinssatz pro ZE' }, //
						{ symbol: 'C_{lm}', description: 'bestandsabhängige Lagerkosten ohne Zinsen' } //
					]
				}
			],
			dataTable: {
				headers: ['Periode t', '1', '2', '3', '4', '5'],
				rows: [['Materialverbrauch (Tonnen)', 81, 90, 84, 87, 83]]
			},

			subTasks: [
				{
					label: 'a',
					question: 'Bei welcher Menge x ist der Gewinn maximal?',
					steps: [
						{
							title: 'Gewinn im Optimum berechnen',
							description: 'Setze die optimale Menge (x = 50) in die Gewinnfunktion ein.',
							math: 'G(50) = 100 \\cdot 50 - 50^2 = 5000 - 2500 = 2500',
							dataTable: {
								headers: ['Periode T', 'Verbrauch', 'Prognose P_T'],
								rows: [
									['1', 81, '-'],
									['2', 90, 81],
									['3', 84, '82,8 (Neu)']
								]
							}
						},
						{
							title: 'Kosten im Optimum berechnen',
							description:
								'Setze x = 50 in die Kostenfunktion ein, um das eingesetzte Kapital zu bestimmen.',
							math: 'K(50) = 10 \\cdot 50 = 500'
						},
						{
							title: 'Rentabilität berechnen',
							description:
								'Die Rentabilität ergibt sich aus dem Verhältnis von Gewinn zu Kosten (eingesetztem Kapital).',
							math: 'R = \\frac{G}{K} = \\frac{2500}{500} = 5 = 500\\%'
						}
					],
					finalResultText: 'Die optimale Menge ist',
					finalResultMath: 'x = 50'
				},
				{
					label: 'b',
					question: 'Wie hoch ist die Rentabilität in diesem Optimum?',
					steps: [
						{
							title: 'Gewinn im Optimum berechnen',
							description: 'Setze die optimale Menge (x = 50) in die Gewinnfunktion ein.',
							math: 'G(50) = 100 \\cdot 50 - 50^2 = 5000 - 2500 = 2500'
						},
						{
							title: 'Kosten im Optimum berechnen',
							description:
								'Setze x = 50 in die Kostenfunktion ein, um das eingesetzte Kapital zu bestimmen.',
							math: 'K(50) = 10 \\cdot 50 = 500'
						}
					],
					finalResultText: 'Die Rentabilität beträgt ',
					finalResultMath: 'R = 50'
				}
			]
		}
	}
};






