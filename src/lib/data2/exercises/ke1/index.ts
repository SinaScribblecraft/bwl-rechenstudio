import type { ExerciseData, UnitMeta } from '$lib/data2/types';
import andlerRaw from './andler.json';
import homogenitaetRaw from './homogenitaet.json';
import gutenberg from './gutenberg-anpassung.json';
import kostenfuntionLinear from './kostenfunktionen-linear.json';
import minimalkostenkombination from './minimalkostenkombination.json';
import expand from './expand.json';

export const meta: UnitMeta = {
	title: 'KE1 – Grundlagen & Leistungsprozess',
	icon: '⏱️'
};

const ke1: ExerciseData = {
	...andlerRaw,
	...homogenitaetRaw,
	...gutenberg,
	...kostenfuntionLinear,
	...minimalkostenkombination,
	...expand
} as ExerciseData;


console.log('ke1 keys:', Object.keys(ke1));  // ← hier
export default ke1;
