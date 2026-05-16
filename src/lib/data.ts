import type { TopicData } from '$lib/types';


export const exerciseDatabase: Record<string, Record<string, TopicData>> = {
	ke1: {
		andler: {
			title: 'Optimale Bestellmenge (Andler)',
			subtitle: 'Berechne das Bestelloptimum, die Lagerkosten und die Bestellkosten.',

			exercises: [
				{
					title: 'Klausuraufgabe: Möbelhändler „Zurwegen“',
					description:
						'Möbelhändler „Zurwegen" hat einen Jahresbedarf von 800 Tischen. Einstandspreis: 400 € pro Tisch. Bestellfixe Kosten: 10 € pro Bestellung. Zinssatz: 10 % p.a.',
					formulas: [
						{
							name: 'Andler-Formel (Grundmodell)',
							result: {
								symbol: 'y^{opt}',
								description: 'Optimale Bestellmenge'
							},
							math: 'y^{opt} = \\sqrt{\\frac{2 \\cdot R \\cdot C_r}{C_l}}',
							params: [
								{ symbol: 'R', description: 'Gesamtbedarf in Planperiode T' },
								{ symbol: 'C_r', description: 'bestellfixe Kosten pro Bestellung (€/Bestellung)' },
								{ symbol: 'C_l', description: 'Lagerkostensatz (€/(ME·ZE))' }
							]
						},
						{
							name: 'Lagerkostensatz',
							result: { symbol: 'C_l', description: 'Lagerkosten pro Stück' },
							math: 'C_l = b \\cdot i + C_{lm}',
							params: [
								{ symbol: 'b', description: 'Einstandspreis pro ME (€/ME)' },
								{ symbol: 'i', description: 'Zinssatz pro ZE' },
								{ symbol: 'C_{lm}', description: 'bestandsabhängige Lagerkosten ohne Zinsen' }
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
				},

				{
					title: 'Klausuraufgabe: Fahrrad-Fabrik',
					description: 'Hier ist eine zweite Aufgabe zum Testen der Tabs.',
					formulas: [],
					subTasks: [
						{
							label: 'a',
							question: 'Was ist die optimale Menge?',
							steps: []
						}
					]
				}
			]
		},
		gewinn: {
			title: 'Gewinn- vs. Rentabilitätsmaximierung',
			subtitle: 'Analyse von Gewinnfunktion und Kapitalbedarfsfunktion',
			exercises: [
				{
					title: 'Aufgabe 3: Gewinn- vs. Rentabilitätsmaximierung',
					description:
						'Gegeben seien die Gewinnfunktion $G(x) = -2/3 \\cdot x^2 + 27 \\cdot x - 80$ und die Kapitalbedarfsfunktion $K(x) = 1/2 \\cdot x$ in Abhängigkeit von der Produktions- bzw. Absatzmenge x.',
					formulas: [
						{
							name: 'Rentabilitätsfunktion',
							result: { symbol: 'R(x)', description: 'Rentabilität (in Dezimal oder %)' },
							math: 'R(x) = \\frac{G(x)}{K(x)}',
							params: [
								{ symbol: 'G(x)', description: 'Gewinnfunktion' },
								{ symbol: 'K(x)', description: 'Kapitalbedarfsfunktion (eingesetztes Kapital)' }
							]
						},
						{
							name: "Quotientenregel (für R'(x))",
							result: { symbol: "R'(x)", description: '1. Ableitung der Rentabilität' },
							math: "R'(x) = \\frac{G'(x) \\cdot K(x) - G(x) \\cdot K'(x)}{[K(x)]^2}",
							params: [
								{ symbol: 'G(x)', description: 'Gewinnfunktion' },
								{ symbol: "G'(x)", description: '1. Ableitung der Gewinnfunktion' },
								{ symbol: 'K(x)', description: 'Kapitalbedarfsfunktion' },
								{ symbol: "K'(x)", description: '1. Ableitung der Kapitalbedarfsfunktion' }
							]
						}
					],
					subTasks: [
						{
							label: 'a',
							question: 'Stellen Sie die Rentabilitätsfunktion auf!',
							steps: [
								{
									title: 'Funktionen einsetzen',
									description:
										'Die Rentabilität ist definiert als der Quotient aus Gewinn und eingesetztem Kapital. Wir setzen die gegebenen Funktionen direkt ein.',
									math: 'R(x) = \\frac{-\\frac{2}{3}x^2 + 27x - 80}{\\frac{1}{2}x}'
								}
							],
							finalResultText: 'Die Rentabilitätsfunktion lautet:',
							finalResultMath: 'R(x) = \\frac{-\\frac{2}{3}x^2 + 27x - 80}{\\frac{1}{2}x}'
						},
						{
							label: 'b',
							question:
								'Ermitteln Sie die gewinnmaximale Menge, den maximalen Gewinn, den gewinnmaximalen Kapitaleinsatz sowie die gewinnmaximale Rentabilität!',
							steps: [
								{
									title: '1. Gewinnfunktion ableiten',
									description:
										'Zur Gewinnmaximierung muss die erste Ableitung der Gewinnfunktion G(x) gebildet werden.',
									math: "G'(x) = -\\frac{4}{3}x + 27"
								},
								{
									title: '2. Nullsetzen und Menge (x*) ermitteln',
									description:
										"Wir setzen G'(x) = 0 und lösen nach x auf, um die gewinnmaximale Menge zu finden.",
									math: '-\\frac{4}{3}x + 27 = 0 \\quad \\Rightarrow \\quad x^* = 20{,}25 \\text{ ME}'
								},
								{
									title: '3. Maximalen Gewinn berechnen',
									description: 'Setze x* = 20,25 in die ursprüngliche Gewinnfunktion G(x) ein.',
									math: 'G(20{,}25) = -\\frac{2}{3}(20{,}25)^2 + 27(20{,}25) - 80 = 193{,}375 \\text{ GE}'
								},
								{
									title: '4. Kapitaleinsatz berechnen',
									description: 'Setze x* = 20,25 in die Kapitalbedarfsfunktion K(x) ein.',
									math: 'K(20{,}25) = \\frac{1}{2} \\cdot 20{,}25 = 10{,}125 \\text{ GE}'
								},
								{
									title: '5. Gewinnmaximale Rentabilität berechnen',
									description: 'Teile den maximalen Gewinn durch den zugehörigen Kapitaleinsatz.',
									math: 'R(20{,}25) = \\frac{193{,}375}{10{,}125} \\approx 19{,}0987 \\dots \\approx 1909{,}88\\%'
								}
							],
							finalResultText: 'Die gewinnmaximale Rentabilität liegt bei',
							finalResultMath: '\\approx 1909{,}88\\%'
						},
						{
							label: 'c',
							question:
								'Ermitteln Sie die rentabilitätsmaximale Menge, maximale Rentabilität, Kapitaleinsatz und Gewinn!',
							steps: [
								{
									title: '1. Quotientenregel anwenden',
									description:
										'Zur Rentabilitätsmaximierung muss R(x) abgeleitet und null gesetzt werden. Ein Bruch wird null, wenn sein Zähler null wird. Wir betrachten also nur den Zähler der Quotientenregel.',
									math: "G'(x) \\cdot K(x) - G(x) \\cdot K'(x) = 0"
								},
								{
									title: '2. Funktionen in den Zähler einsetzen',
									description:
										"Setze G(x), K(x) und deren Ableitungen G'(x) und K'(x) in die Bedingung ein.",
									math: '\\left(-\\frac{4}{3}x + 27\\right) \\cdot \\frac{1}{2}x - \\left(-\\frac{2}{3}x^2 + 27x - 80\\right) \\cdot \\frac{1}{2} = 0'
								},
								{
									title: '3. Ausmultiplizieren und zusammenfassen',
									description: 'Löse die Klammern auf und fasse die Terme mit x² zusammen.',
									math: '-\\frac{2}{3}x^2 + \\frac{27}{2}x - \\left(-\\frac{1}{3}x^2 + \\frac{27}{2}x - 40\\right) = -\\frac{1}{3}x^2 + 40 = 0'
								},
								{
									title: '4. Rentabilitätsmaximale Menge (x) ermitteln',
									description:
										'Löse die Gleichung nach x auf. (Das negative Ergebnis entfällt ökonomisch).',
									math: 'x^2 = 120 \\quad \\Rightarrow \\quad x = \\sqrt{120} \\approx 10{,}954 \\text{ ME}'
								},
								{
									title: '5. Werte im Optimum berechnen',
									description: 'Setze x = 10,954 in K(x), G(x) und schließlich R(x) ein.',
									math: '\\begin{aligned} K(10{,}95) &\\approx 5{,}477 \\text{ GE} \\\\ G(10{,}95) &\\approx 135{,}770 \\text{ GE} \\\\ R(10{,}95) &\\approx \\frac{135{,}770}{5{,}477} \\approx 24{,}788 \\dots \\approx 2478{,}81\\% \\end{aligned}'
								}
							],
							finalResultText: 'Die maximale Rentabilität beträgt',
							finalResultMath: '\\approx 2478{,}81\\%'
						}
					]
				}
			]
		}
	}
};
