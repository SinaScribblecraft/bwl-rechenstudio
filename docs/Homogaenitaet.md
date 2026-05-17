Übungsbericht: Homogenitätsanalyse neuartiger Produktionsfunktionen

1. Theoretische Einführung in den Homogenitätsgrad

In der betriebswirtschaftlichen Produktionstheorie stellt die Homogenitätsanalyse ein fundamentales Instrument dar, um die Reaktion der Ausbringungsmenge auf eine proportionale Änderung sämtlicher Produktionsfaktoren zu evaluieren. Die hier untersuchten Funktionen lassen sich der Kategorie der substitutionalen Produktionsfunktionen (gemäß Abschnitt 2.2.2.2 des Skripts) zuordnen. Im Gegensatz zu limitationalen Funktionen erlauben diese eine Variation des Faktoreinsatzverhältnisses bei konstanter Ausbringungsmenge.

Mathematisch basiert die Analyse auf dem sogenannten \lambda-Ansatz. Dabei wird jeder Produktionsfaktor r_i mit einem Skalierungsfaktor \lambda multipliziert, der ökonomisch als das Prozeßniveau interpretiert wird. Eine Produktionsfunktion f(r_1, r_2) gilt als homogen vom Grade t, wenn für alle \lambda > 0 die Identität erfüllt ist: f(\lambda r_1, \lambda r_2) = \lambda^t \cdot f(r_1, r_2)

Der resultierende Homogenitätsgrad t determiniert die Art der Skalenerträge. Die folgende Tabelle bietet eine Klassifizierung und ökonomische Einordnung:

Homogenitätsgrad (t)	Beispiel-Exponent (t)	Klassifizierung	Ökonomische Bedeutung (Skalenerträge)
t = 1	1,0	linearhomogen	Konstante Skalenerträge: Die Ausbringung steigt proportional zum Prozeßniveau \lambda.
t > 1	2,0	überlinearhomogen	Steigende (progressive) Skalenerträge: Die Ausbringung steigt überproportional zum Prozeßniveau.
t < 1	0,5	unterlinearhomogen	Sinkende (degressive) Skalenerträge: Die Ausbringung steigt unterproportional zum Prozeßniveau.
nicht definierbar	-	nichthomogen	Keine einheitliche Reaktion der Ausbringung auf proportionale Faktorskalierung.


--------------------------------------------------------------------------------


2. Aufgabe 1: Die Additive Linearkombination

Untersucht wird eine rein lineare Produktionsfunktion der Form: f(r_1, r_2) = a \cdot r_1 + b \cdot r_2

Rechenweg

1. Einsetzen des Prozeßniveaus \lambda: f(\lambda r_1, \lambda r_2) = a \cdot (\lambda r_1) + b \cdot (\lambda r_2)
2. Ausklammern von \lambda: f(\lambda r_1, \lambda r_2) = \lambda^1 \cdot (a \cdot r_1 + b \cdot r_2)
3. Bestimmung von t: Da \lambda mit dem Exponenten 1 vor der ursprünglichen Funktion steht, ergibt sich t = 1.

Analyse

Die Funktion ist homogen vom Grade t = 1 (linearhomogen). Eine Erhöhung des Prozeßniveaus um den Faktor \lambda führt zu einer Erhöhung des Outputs um exakt denselben Faktor. Mathematisch und ökonomisch liegen somit konstante Skalenerträge vor.


--------------------------------------------------------------------------------


3. Aufgabe 2: Die Quadratische Polynomfunktion

Es soll die Homogenität der folgenden substitutionalen Polynomfunktion geprüft werden: f(r_1, r_2) = r_1^2 + r_1 r_2 + r_2^2

Rechenweg

1. Einsetzen von \lambda: f(\lambda r_1, \lambda r_2) = (\lambda r_1)^2 + (\lambda r_1)(\lambda r_2) + (\lambda r_2)^2
2. Anwendung der Potenzgesetze: f(\lambda r_1, \lambda r_2) = \lambda^2 r_1^2 + \lambda^2 r_1 r_2 + \lambda^2 r_2^2
3. Ausklammern der gemeinsamen Potenz \lambda^2: f(\lambda r_1, \lambda r_2) = \lambda^2 \cdot (r_1^2 + r_1 r_2 + r_2^2)

Analyse

Die Funktion weist einen Homogenitätsgrad von t = 2 auf und ist damit überlinearhomogen. Eine proportionale Steigerung des Faktoreinsatzes resultiert in einer quadratischen Zunahme der Ausbringungsmenge, was progressiven Skalenerträgen entspricht.


--------------------------------------------------------------------------------


4. Aufgabe 3: Die Radizierte Summenfunktion (Wurzelfunktion)

Untersucht wird eine Funktion mit einer Wurzel über der Summe der Einsatzfaktoren: f(r_1, r_2) = \sqrt{r_1 + r_2}

Rechenweg

1. Einsetzen von \lambda: f(\lambda r_1, \lambda r_2) = \sqrt{\lambda r_1 + \lambda r_2}
2. Faktorisierung innerhalb des Radikanden: f(\lambda r_1, \lambda r_2) = \sqrt{\lambda(r_1 + r_2)}
3. Anwendung der Wurzelgesetze (\sqrt[n]{x^m} = x^{m/n}): Unter Nutzung der Regel \sqrt{\lambda} = \lambda^{0,5} ergibt sich: f(\lambda r_1, \lambda r_2) = \lambda^{0,5} \cdot \sqrt{r_1 + r_2} = \lambda^{0,5} \cdot f(r_1, r_2)

Analyse

Die Funktion ist unterlinearhomogen vom Grade t = 0,5. Eine Erhöhung des Prozeßniveaus führt zu einer unterproportionalen Steigerung des Outputs (degressive Skalenerträge).


--------------------------------------------------------------------------------


5. Aufgabe 4: Die Gebrochen-Rationale Interaktionsfunktion

Diese komplexe Funktion kombiniert Interaktionsterme im Zähler mit additiven Strukturen im Nenner: f(r_1, r_2) = \frac{r_1^2 \cdot r_2^2}{r_1 + r_2}

Rechenweg

1. Multiplikation der Faktoren mit \lambda: f(\lambda r_1, \lambda r_2) = \frac{(\lambda r_1)^2 \cdot (\lambda r_2)^2}{\lambda r_1 + \lambda r_2}
2. Potenzrechnung und Faktorisierung:
* Zähler: \lambda^2 r_1^2 \cdot \lambda^2 r_2^2 = \lambda^{2+2} \cdot (r_1^2 \cdot r_2^2) = \lambda^4 \cdot (r_1^2 \cdot r_2^2)
* Nenner: \lambda^1 \cdot (r_1 + r_2)
3. Kürzen unter Anwendung der Exponentenregel (\frac{\lambda^n}{\lambda^m} = \lambda^{n-m}): f(\lambda r_1, \lambda r_2) = \frac{\lambda^4}{\lambda^1} \cdot \frac{r_1^2 \cdot r_2^2}{r_1 + r_2} = \lambda^{4-1} \cdot f(r_1, r_2) = \lambda^3 \cdot f(r_1, r_2)

Analyse

Die Funktion ist überlinearhomogen vom Grade t = 3. Dies impliziert massiv steigende Skalenerträge bei einer Variation des Prozeßniveaus.


--------------------------------------------------------------------------------


6. Aufgabe 5: Die Nichthomogene Funktion (Konstanten-Test)

Geprüft wird eine Funktion mit einem additiven konstanten Glied c > 0: f(r_1, r_2) = r_1 + r_2 + c

Rechenweg

1. Einsetzen des Prozeßniveaus \lambda: f(\lambda r_1, \lambda r_2) = \lambda r_1 + \lambda r_2 + c
2. Versuch der Faktorisierung: \lambda(r_1 + r_2) + c
3. Prüfung der Homogenitätsidentität: Die Bedingung f(\lambda r_1, \lambda r_2) = \lambda^t \cdot f(r_1, r_2) müsste als Identität für alle \lambda > 0 gelten. Da jedoch gilt: \lambda(r_1 + r_2) + c \neq \lambda^t \cdot (r_1 + r_2 + c) kann \lambda nicht vollständig aus dem Term ausgeklammert werden, da die Konstante c nicht durch \lambda skaliert wird.

Analyse

Aufgrund der additiven Konstante c verliert die Funktion die Homogenitätseigenschaft. Sie ist als nichthomogen einzustufen.


--------------------------------------------------------------------------------


7. Zusammenfassende Übersicht der Ergebnisse

In Übereinstimmung mit der rechnerischen Ableitung über das Prozeßniveau \lambda lassen sich die Ergebnisse wie folgt zusammenfassen. Während bei einer standardmäßigen Cobb-Douglas-Funktion (siehe Punkt 5 des Quellmaterials) der Homogenitätsgrad einfach die Summe der Exponenten darstellt, erfordern diese komplexeren substitutionalen Funktionen eine explizite algebraische Herleitung:

Funktionsbezeichnung	Homogenitätsgrad (t)	Typ der Skalenerträge
Additive Linearkombination	t = 1	Konstante Skalenerträge
Quadratische Polynomfunktion	t = 2	Progressive Skalenerträge
Radizierte Summenfunktion	t = 0,5	Degressive Skalenerträge
Gebrochen-Rationale Interaktion	t = 3	Progressive Skalenerträge
Funktion mit additivem Term (c)	nicht definierbar	Nichthomogen

Diese Analyse verdeutlicht, dass die Bestimmung von t essenziell für die Planung der optimalen Betriebsgröße und die Vorhersage der Output-Reaktionen auf Skaleneffekte ist.

