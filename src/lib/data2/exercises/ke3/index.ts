import type { ExerciseData, UnitMeta } from '$lib/data2/types';
import zinseszinsrechnung from './zinseszinsrechnung.json'
import kapitalwert from './kapitalwert.json';
import endwertVofi from './endwert-vofi.json'
import annuitaet from './annuitaet.json'
import internerZinsfuss from './interner-zinsfuss.json'
import ertragswert from './ertragswert.json'
import nullkuponanleihe from './nullkuponanleihe.json'
import deanModell from './dean-modell.json'
import finanzierungAbschreibungRueckstellung from './finanzierung-abschreibung-rueckstellung.json'

export const meta: UnitMeta = {
	title: 'KE3 – Investition und Finanzierung',
	icon: '⏱️'
};

const ke3: ExerciseData = {
	...zinseszinsrechnung,
	...kapitalwert,
	...endwertVofi,
	...annuitaet,
	...internerZinsfuss,
	...ertragswert,
	...nullkuponanleihe,
	...deanModell,
	...finanzierungAbschreibungRueckstellung
} as ExerciseData;

export default ke3;
