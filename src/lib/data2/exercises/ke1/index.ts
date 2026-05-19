import type { ExerciseData, UnitMeta } from '$lib/data2/types';
// import andlerRaw from './andler.json';
// import homogenitaetRaw from './homogenitaet.json';
// import gutenberg from './gutenberg-anpassung.json';
// import kostenfuntionLinear from './kostenfunktionen-linear.json';
// import minimalkostenkombination.json from './minimalkostenkombination.json.json';
// import expand from './expand.json';
// import subst from './subst.json';
// import los from './optimale-bestellmenge_old.json';
// import optimaleBestellmenge from './optimale-bestellmenge_old.json';
// import  homo2 from './homo2.json'
import prognoseverfahren from './prognoseverfahren.json';
import gewinnRentabilitaet from './gewinn-rentabilitaet.json'
import gewinnRentabilitaet2 from './gewinn-rentabilitaet2.json'
import optimaleBestellmenge from './optimale-bestellmenge.json'

export const meta: UnitMeta = {
	title: 'KE1 – Grundlagen & Leistungsprozess',
	icon: '⏱️'
};

const ke1: ExerciseData = {
	...gewinnRentabilitaet,
	...gewinnRentabilitaet2,
	...prognoseverfahren,
	...optimaleBestellmenge
} as ExerciseData;


console.log('ke1 keys:', Object.keys(ke1));  // ← hier
export default ke1;
