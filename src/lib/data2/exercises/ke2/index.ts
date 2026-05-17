import type { ExerciseData, UnitMeta } from '$lib/data2/types';
import andlerRaw      from './andlerExercises.json';
import homogenitaetRaw from './homogenitaet.json';

// // $schema-Key rausdestrukturieren — der gehört nicht in ExerciseData
// const { $schema: _1, ...andler }      = andlerRaw;
// const { $schema: _2, ...homogenitaet } = homogenitaetRaw;

export const meta: UnitMeta = {
	title: 'KE2 – Leistungsprozesse',
	icon: '⏱️'
};


const ke2: ExerciseData = { ...andlerRaw, ...homogenitaetRaw } as ExerciseData;

export default ke2;