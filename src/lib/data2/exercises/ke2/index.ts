import type { ExerciseData, UnitMeta } from '$lib/data2/types';
// import andlerRaw      from './andlerExercises.json';
// import homogenitaetRaw from './homogenitaet.json';
import losgroessen2 from './losgroessen2.json';
import minimalkostenkombination from './minimalkostenkombination.json'
import lineareProduktionsfunktion from './lineare-produktionsfunktion.json'
import produktionsprogramm from './produktionsprogramm.json'
import cournotOligopol from './cournot-oligopol.json'
import cournotMonopol from './cournot-monopol.json'
import preiselastizitaet from './preiselastizitaet.json'

// // $schema-Key rausdestrukturieren — der gehört nicht in ExerciseData
// const { $schema: _1, ...andler }      = andlerRaw;
// const { $schema: _2, ...homogenitaet } = homogenitaetRaw;

export const meta: UnitMeta = {
	title: 'KE2 – Leistungsprozesse',
	icon: '⏱️'
};

const ke2: ExerciseData = {
	...losgroessen2,
	...minimalkostenkombination,
	...lineareProduktionsfunktion,
	...produktionsprogramm,
	...cournotOligopol,
	...cournotMonopol,
	...preiselastizitaet
} as ExerciseData;

export default ke2;
