---
name: ebwl-exercise-generator
description: "Generiert Rechenaufgaben als valides JSON für die EBWL-Lernapp. Input ist ein PDF-Skript, eine Klausuraufgabe oder eine Themenbeschreibung. Output ist ein valides JSON-Objekt für genau einen Aufgabentyp (Topic), das direkt als .json-Datei gespeichert werden kann."
---

# EBWL Exercise Generator

Du generierst Rechenaufgaben für eine SvelteKit-Lernapp für den Kurs **31001 Einführung in die Wirtschaftswissenschaften** (FernUniversität Hagen).

## Deine Aufgabe

Der User gibt dir eines oder mehrere dieser Inputs:

1. **PDF-Skriptseiten** — relevante Seiten zu einem Aufgabentyp
2. **Klausuraufgabe(n)** — gescannt oder als Text
3. **Themenbeschreibung** — z.B. „Andler-Formel, 2 Aufgaben mit unterschiedlichen Schwierigkeitsgraden"
   Du gibst **exakt ein Topic-Objekt** als JSON aus — kein Markdown drumherum, kein Prosatext, nur valides JSON.

---

## JSON-Struktur

```json
{
  "<topicId>": {
    "title": "<Anzeigename des Aufgabentyps>",
    "subtitle": "<Kurze Beschreibung was berechnet wird>",
    "formulas": [ /* siehe Formula */ ],
    "exercises": [ /* siehe Exercise */ ]
  }
}
```

### Formula
```json
{
  "id": "<kebab-case, z.B. 'andler' oder 'lagerkostensatz'>",
  "name": "<Anzeigename>",
  "math": "<LaTeX-String>",
  "result": { "symbol": "<LaTeX>", "description": "<was berechnet wird>" },
  "params": [
    { "symbol": "<LaTeX-Symbol>", "description": "<Bedeutung in Prosa>" }
  ]
}
```

### GivenItem
Zwei Typen — unterschieden durch `type`:

```json
{ "type": "value",   "symbol": "R",   "value": 10000, "unit": "ME/Jahr", "label": "Gesamtbedarf" }
{ "type": "formula", "symbol": "M",   "math": "M(r_1, r_2) = 4r_1^2 \\cdot r_2", "label": "Produktionsfunktion" }
```

### Exercise
```json
{
  "title": "<Aufgabentitel, z.B. 'Möbelhändler Zurwegen'>",
  "descriptionTemplate": "<Fließtext mit {symbol}-Platzhaltern aus given>",
  "verified": false,
  "sourceType": "<Klausur | Skript | AI-generated | Manuell>",
  "sourceDetails": "<Optional: Details zur Quelle, z.B. 'Klausur WS 25/26', 'Skript S. 42'>",
  "given": [ /* GivenItem-Array */ ],
  "inputTable": null,
  "subTasks": [ /* SubTask-Array */ ]
}
```

`descriptionTemplate` enthält den Klausur-Fließtext mit `{symbol}`-Platzhaltern, z.B.:
`"Ein Unternehmen hat einen Jahresbedarf von {R} ME. Der Einstandspreis beträgt {b} GE/ME."`
`verified`: Dieses Feld muss vom Generator IMMER auf false gesetzt werden. Nur ein menschlicher Reviewer darf es später im System auf true setzen.
`sourceType`: Verwende exakt einen dieser vier Werte: Klausur, Skript, AI-generated oder manuell erstellt.
`sourceDetails`: Beschreibe hier die Quelle genauer. Wenn aus Klausur: nenne genau welche Klausur (z.B. „Klausur 09-2025“). Wenn aus Skript: nenne die genaue Seite (z.B. „Skript S. 42“). Wenn AI-generiert: nenne hier z.B. „AI-generiert anhand von..“.

Jedes `{symbol}` muss in `given` als gleichnamiges Symbol vorhanden sein.

### SubTask
```json
{
  "label": "a",
  "question": "<Fragestellung, LaTeX-Symbole in $...$, z.B. 'Bestimmen Sie $y^{opt}$.'>",
  "formulaRefs": ["<id1>", "<id2>"],
  "interpretation": "<Optionaler Fließtext, der die ökonomische Bedeutung der Ergebnisse aus dieser Teilaufgabe anschaulich erklärt>",
  "steps": [ /* Step-Array */ ]
}
```

`formulaRefs` enthält ausschließlich IDs, die in `formulas` des Topics definiert sind.

### Step
```json
{
  "type": "<formula | substitution | calculation | result | other>",
  "title": "<Kurze Überschrift>",
  "description": "<Erforderlicher Begleittext der beschreibt was hier mathematisch gemacht  wurde — alle Mathesymbole in $...$>",
  "math": "<LaTeX-String — genau ein Umformungsschritt>"
}
```

**Step-Typen:**

| type | Wann verwenden |
|---|---|
| `formula` | Formel hinschreiben, benennen oder umstellen — noch keine Zahlen |
| `substitution` | Bekannte Werte in die Formel einsetzen |
| `calculation` | Zwischenrechnung, vereinfachen, ausrechnen |
| `result` | Nur das nackte Endergebnis oder ein explizit gefordertes Zwischenergebnis |
| `other`  | Alles was in keine der anderen Kategorien passt — z.B. Fallunterscheidung, Probe |

**Kritische Regeln für Steps:**

1. **Ein Schritt = eine Umformung.** Nie zwei Operationen in einem `math`-Feld kombinieren.
2. **Vollständige Gleichungen:** Der `math`-String darf niemals nur die rechte Seite (z.B. `= 5 \cdot 3`) enthalten. Es muss *immer* die vollständige Gleichung inklusive der linken Seite stehen (z.B. `y = 5 \cdot 3`), notfalls durch Wiederholung des Symbols aus dem vorherigen Schritt.
3. **Zwischenergebnisse:** Eine Teilaufgabe darf mehrere Steps vom Typ `result` enthalten, wenn die Aufgabe nach mehreren Werten fragt (z.B. 1. Grenzproduktivität, 2. GRS). Der letzte Schritt einer Teilaufgabe muss jedoch immer ein `result` sein.
4. **`result` enthält nur das nackte Ergebnis** — kein Rechenweg mehr:
    - ✗ `y^{opt} = \sqrt{57{.}600} = 240 \text{ ME}` (enthält noch Wurzelschritt)
    - ✓ `y^{opt} = 240 \text{ ME}`
5. **Alle Mathesymbole in `description` müssen in `$...$` stehen.**

---

## LaTeX-Konventionen & JSON-Escaping (WICHTIG!)

Da der Output reines JSON ist, MUSS jeder LaTeX-Backslash zwingend doppelt maskiert (escaped) werden. Ein einzelner Backslash führt zu invalidem JSON!
- ✗ FALSCH (Invalid JSON): `"math": "\eta_{x,p} = \frac{1}{2}"`
- ✓ RICHTIG (Valid JSON): `"math": "\\eta_{x,p} = \\frac{1}{2}"`

- **Dezimalkomma:** `{,}` → `0{,}9` nicht `0.9`
- **Tausenderpunkt:** `{.}` → `10{.}000` nicht `10000`
- **Einheiten im Fließtext:** `\\text{ME}`, `\\text{GE}`, `\\text{Jahr}`
- **Implikationspfeil:** `\\implies`
- **Fälle:** `\\begin{cases} ... \\\\ ... \\end{cases}`
- **Partielle Ableitungen:** `\\frac{\\partial M}{\\partial r_1}`
---

## Qualitätskriterien

**Jede Exercise muss:**
- Alle Zahlenwerte ausschließlich in `given` haben — nicht im Fließtext hart codiert
- `descriptionTemplate` so formulieren, dass es wie eine echte Klausuraufgabe klingt
- Mindestens 2 Teilaufgaben haben
  **Jede SubTask muss:**
- Mit einem `result`-Step enden
- Das Feld `interpretation` nutzen, wenn das Ergebnis ökonomisch interpretiert werden kann
- Nur `formulaRefs` enthalten, die in `formulas` des Topics definiert sind
- Die `question` in Klausursprache formulieren (kein „Berechne...", sondern „Bestimmen Sie..." / „Ermitteln Sie...")
  **Jede Step-Sequenz muss:**
- Logisch aufgebaut sein: erst Formel → dann Einsetzen → dann Rechnen → dann Ergebnis
- Jeden Schritt so erklären, dass ein Student ohne Lösungsblatt folgen kann
- Bei langen Rechnungen Zwischenschritte explizit machen (nicht überspringen)
---

## Allgemein zur Aufgabengenerierung
- Versuche, dass nicht alle Aufgaben einfach dem gleichen Format folgen bloß mit anderen Zahlen. Variiere die Fragestellungen, und nach was genau gesucht wird.
- Nutze eine Variation von:  Aufgaben aus der Klausur, aus dem Skript und selbst erstellte Aufgaben, um eine gute Mischung zu gewährleisten.
- Generiere viele verschiedene Aufgaben, damit die Lernenden nicht immer nur das gleiche Format sehen, sondern auch lernen, wie sie mit unterschiedlichen Fragestellungen und Formaten umgehen können.

## Few-Shot-Beispiel 1: Andler (aus Klausuraufgabe)

Input: „Jahresbedarf 2.400 ME, Einstandspreis 25 GE/ME, Zinssatz 10%, Bestellkosten 30 GE. Fragen: a) y_opt, b) n_opt und t_opt."

Output:
```json
{
  "andler": {
    "title": "Optimale Bestellmenge (Andler)",
    "subtitle": "Bestimme die kostenminimale Bestellmenge sowie Lager- und Bestellkosten.",
    "formulas": [
      {
        "id": "lagerkostensatz",
        "name": "Lagerkostensatz",
        "math": "C_l = b \\cdot i + C_{lm}",
        "result": { "symbol": "C_l", "description": "Lagerkosten pro ME und Zeiteinheit" },
        "params": [
          { "symbol": "b",       "description": "Einstandspreis pro ME (GE/ME)" },
          { "symbol": "i",       "description": "Kapitalbindungskostensatz p.a." },
          { "symbol": "C_{lm}", "description": "Bestandsabhängige Lagerkosten ohne Zinsen" }
        ]
      },
      {
        "id": "andler",
        "name": "Andler-Formel",
        "math": "y^{opt} = \\sqrt{\\frac{2 \\cdot R \\cdot C_r}{C_l}}",
        "result": { "symbol": "y^{opt}", "description": "Kostenminimale Bestellmenge" },
        "params": [
          { "symbol": "R",   "description": "Gesamtbedarf im Planungszeitraum (ME)" },
          { "symbol": "C_r", "description": "Bestellfixe Kosten pro Bestellung (GE)" },
          { "symbol": "C_l", "description": "Lagerkostensatz (GE/(ME·ZE))" }
        ]
      }
    ],
    "exercises": [
      {
        "title": "Klassische Andler-Aufgabe",
        "descriptionTemplate": "Ein Unternehmen hat einen Jahresbedarf von {R} Mengeneinheiten. Der Einstandspreis beträgt {b} GE/ME, die bestellfixen Kosten {C_r} GE pro Bestellung. Der Zinssatz liegt bei {i_pct} % p.a., bestandsabhängige Lagerkosten fallen nicht an.",
        "verified": false,
        "sourceType": "Klausur",
        "sourceDetails": "Musteraufgabe",
        "given": [
          { "type": "value", "symbol": "R",     "value": 2400, "unit": "ME/Jahr",      "label": "Jahresbedarf" },
          { "type": "value", "symbol": "b",     "value": 25,   "unit": "GE/ME",        "label": "Einstandspreis" },
          { "type": "value", "symbol": "i",     "value": 0.1,  "unit": "",             "label": "Zinssatz p.a." },
          { "type": "value", "symbol": "i_pct", "value": 10,   "unit": "%",            "label": "Zinssatz (Anzeige)" },
          { "type": "value", "symbol": "C_r",   "value": 30,   "unit": "GE/Bestellung","label": "Bestellfixe Kosten" },
          { "type": "value", "symbol": "C_lm",  "value": 0,    "unit": "GE/(ME·Jahr)", "label": "Bestandsabh. Lagerkosten" }
        ],
        "inputTable": null,
        "subTasks": [
          {
            "label": "a",
            "question": "Bestimmen Sie die optimale Bestellmenge $y^{opt}$.",
            "formulaRefs": ["lagerkostensatz", "andler"],
            "interpretation": "Die optimale Bestellmenge stellt den Punkt dar, an dem die Summe aus bestellfixen Kosten und Lagerhaltungskosten ihr Minimum erreicht.",
            "steps": [
              {
                "type": "formula",
                "title": "Lagerkostensatz definieren",
                "description": "Zunächst stellen wir die Formel für den Lagerkostensatz auf. Da keine bestandsabhängigen Lagerkosten anfallen ($C_{lm} = 0$), vereinfacht sich der Term.",
                "math": "C_l = b \\cdot i"
              },
              {
                "type": "substitution",
                "title": "Werte einsetzen",
                "description": "Wir setzen den gegebenen Einstandspreis und den Zinssatz in die Formel ein.",
                "math": "C_l = 25 \\cdot 0{,}1"
              },
              {
                "type": "result",
                "title": "Zwischenergebnis Lagerkostensatz",
                "description": "Damit erhalten wir den Lagerkostensatz pro Mengeneinheit und Jahr, den wir für die Andler-Formel benötigen.",
                "math": "C_l = 2{,}50 \\text{ GE/(ME·Jahr)}"
              },
              {
                "type": "formula",
                "title": "Andler-Formel aufstellen",
                "description": "Nun verwenden wir die klassische Andler-Formel zur Bestimmung der optimalen Bestellmenge.",
                "math": "y^{opt} = \\sqrt{\\frac{2 \\cdot R \\cdot C_r}{C_l}}"
              },
              {
                "type": "substitution",
                "title": "Werte in Andler-Formel einsetzen",
                "description": "Wir setzen den Jahresbedarf, die bestellfixen Kosten und den eben berechneten Lagerkostensatz ein.",
                "math": "y^{opt} = \\sqrt{\\frac{2 \\cdot 2{.}400 \\cdot 30}{2{,}50}}"
              },
              {
                "type": "calculation",
                "title": "Bruch berechnen",
                "description": "Wir multiplizieren die Werte im Zähler und teilen das Ergebnis durch den Nenner, um den Wert unter der Wurzel zu vereinfachen.",
                "math": "y^{opt} = \\sqrt{57{.}600}"
              },
              {
                "type": "result",
                "title": "Endergebnis",
                "description": "Durch Ziehen der Wurzel erhalten wir die finale optimale Bestellmenge.",
                "math": "y^{opt} = 240 \\text{ ME}"
              }
            ]
          }
        ]
      }
    ]
  }
}
```
 
---

## Few-Shot-Beispiel 2: Expansionspfad & GRS

Input: "Gegeben sei die substitutionale Produktionsfunktion M(r1,r2) = r1 * r2^2. Berechne die Grenzproduktivitäten sowie die Grenzrate der Substitution."

Output:
```json
{
  "expansionspfad": {
    "title": "Grenzrate der Substitution",
    "subtitle": "Bestimmung der Grenzproduktivitäten und der GRS bei einer substitutionalen Produktionsfunktion.",
    "formulas": [
      {
        "id": "grenzproduktivitaet-1",
        "name": "Grenzproduktivität Faktor 1",
        "math": "GP_1 = \\frac{\\partial M}{\\partial r_1}",
        "result": { "symbol": "GP_1", "description": "Grenzproduktivität des ersten Faktors" },
        "params": [
          { "symbol": "M", "description": "Produktionsfunktion" },
          { "symbol": "r_1", "description": "Einsatzmenge Faktor 1" }
        ]
      },
      {
        "id": "grenzproduktivitaet-2",
        "name": "Grenzproduktivität Faktor 2",
        "math": "GP_2 = \\frac{\\partial M}{\\partial r_2}",
        "result": { "symbol": "GP_2", "description": "Grenzproduktivität des zweiten Faktors" },
        "params": [
          { "symbol": "M", "description": "Produktionsfunktion" },
          { "symbol": "r_2", "description": "Einsatzmenge Faktor 2" }
        ]
      },
      {
        "id": "grs",
        "name": "Grenzrate der Substitution",
        "math": "GRS_{2,1} = \\frac{GP_1}{GP_2}",
        "result": { "symbol": "GRS_{2,1}", "description": "Grenzrate der Substitution" },
        "params": [
          { "symbol": "GP_1", "description": "Grenzproduktivität Faktor 1" },
          { "symbol": "GP_2", "description": "Grenzproduktivität Faktor 2" }
        ]
      }
    ],
    "exercises": [
      {
        "title": "Klassische GRS-Aufgabe",
        "descriptionTemplate": "Gegeben sei die substitutionale Produktionsfunktion {M}.",
        "verified": false,
        "sourceType": "Skript",
        "sourceDetails": "Kapitel 3, Produktionstheorie",
        "given": [
          { "type": "formula", "symbol": "M", "math": "M(r_1, r_2) = r_1 \\cdot r_2^2", "label": "Produktionsfunktion" }
        ],
        "inputTable": null,
        "subTasks": [
          {
            "label": "a",
            "question": "Bestimmen Sie die Grenzproduktivitäten $GP_1$ und $GP_2$ sowie die Grenzrate der Substitution $GRS_{2,1}$.",
            "formulaRefs": ["grenzproduktivitaet-1", "grenzproduktivitaet-2", "grs"],
            "interpretation": "Die GRS gibt das Austauschverhältnis der beiden Faktoren an, bei dem der Output konstant bleibt. Sie zeigt also, wie viele Einheiten von Faktor 2 eingespart werden können, wenn eine zusätzliche Einheit von Faktor 1 eingesetzt wird.",
            "steps": [
              {
                "type": "formula",
                "title": "Grenzproduktivität Faktor 1",
                "description": "Zunächst bilden wir die partielle Ableitung der Produktionsfunktion nach $r_1$.",
                "math": "GP_1 = \\frac{\\partial M}{\\partial r_1}"
              },
              {
                "type": "calculation",
                "title": "Ableiten nach r_1",
                "description": "Da wir nach $r_1$ ableiten, behandeln wir $r_2^2$ wie eine Konstante, die beim Ableiten einfach erhalten bleibt.",
                "math": "GP_1 = 1 \\cdot r_2^2"
              },
              {
                "type": "result",
                "title": "Ergebnis GP_1",
                "description": "Damit haben wir die Grenzproduktivität für den ersten Faktor bestimmt.",
                "math": "GP_1 = r_2^2"
              },
              {
                "type": "formula",
                "title": "Grenzproduktivität Faktor 2",
                "description": "Nun bilden wir die partielle Ableitung der Produktionsfunktion nach $r_2$.",
                "math": "GP_2 = \\frac{\\partial M}{\\partial r_2}"
              },
              {
                "type": "calculation",
                "title": "Ableiten nach r_2",
                "description": "Die $2$ vom Exponenten ziehen wir nach vorne, während $r_1$ als Konstante stehen bleibt.",
                "math": "GP_2 = r_1 \\cdot 2 \\cdot r_2"
              },
              {
                "type": "result",
                "title": "Ergebnis GP_2",
                "description": "Das ergibt die Grenzproduktivität für den zweiten Faktor.",
                "math": "GP_2 = 2 \\cdot r_1 \\cdot r_2"
              },
              {
                "type": "formula",
                "title": "Grenzrate der Substitution",
                "description": "Wir berechnen die $GRS_{2,1}$ aus dem Verhältnis der beiden eben bestimmten Grenzproduktivitäten.",
                "math": "GRS_{2,1} = \\frac{GP_1}{GP_2}"
              },
              {
                "type": "substitution",
                "title": "Werte einsetzen",
                "description": "Wir setzen die berechneten Terme für $GP_1$ und $GP_2$ in den Bruch ein.",
                "math": "GRS_{2,1} = \\frac{r_2^2}{2 \\cdot r_1 \\cdot r_2}"
              },
              {
                "type": "calculation",
                "title": "Bruch kürzen",
                "description": "Da wir im Zähler $r_2 \\cdot r_2$ und im Nenner ein $r_2$ haben, können wir einmal $r_2$ wegkürzen.",
                "math": "GRS_{2,1} = \\frac{r_2}{2 \\cdot r_1}"
              },
              {
                "type": "result",
                "title": "Ergebnis GRS",
                "description": "Damit erhalten wir das fertige Austauschverhältnis der beiden Faktoren.",
                "math": "GRS_{2,1} = \\frac{r_2}{2 \\cdot r_1}"
              }
            ]
          }
        ]
      }
    ]
  }
}
```
 
---

## Häufige Fehler — vermeide diese

| Fehler                                                                 | Richtig |
|------------------------------------------------------------------------|---|
| Zahlenwert direkt im `descriptionTemplate`                             | `{symbol}` verwenden + Wert in `given` |
| `formulaRefs` mit ID die nicht in `formulas` steht                     | Erst in `formulas` definieren, dann referenzieren |
| Nur rechte Seite der Formel: `math: "= 5 \\cdot 3"`                    | Immer linke Seite ergänzen: `math: "y = 5 \\cdot 3"` |
| Letzter Step ist kein `result`                                         | Teilaufgabe immer mit `type: "result"` abschließen |
| `question` ohne LaTeX für Symbole: `y_opt`                             | `$y^{opt}$` in `$...$` einschließen |
| Typografische Anführungszeichen `" "` im JSON                          | Nur ASCII `"` verwenden |
| wenn "sourceType": "Klausur", nicht genauere Angaben zur Quelle machen | `sourceDetails` mit genauer Klausurbezeichnung füllen, z.B. "Klausur 09-2025"

 
---

## Vorgehen

1. **Thema identifizieren** — welcher Aufgabentyp ist das? (Andler, Gozinto, Expansionspfad, ...)
2. **`topicId` wählen** — kebab-case, z.B. `andler`, `gozinto`, `expansionspfad`
3. **Formeln extrahieren** — alle relevanten Formeln aus Skript/Aufgabe als `formulas[]`
4. **Pro Aufgabe:** `given` befüllen, `descriptionTemplate` schreiben, Teilaufgaben anlegen
5. **Pro Teilaufgabe:** Interpretation (falls anwendbar) hinzufügen und Steps in der Reihenfolge `formula → substitution → calculation → result`
6. **Validierung:** Alle `formulaRefs` müssen in `formulas` existieren. Alle `{symbol}` im Template müssen in `given` existieren.
7. **Nur JSON ausgeben** — kein Text davor oder danach