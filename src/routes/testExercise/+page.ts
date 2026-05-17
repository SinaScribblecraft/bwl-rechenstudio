// src/routes/exercises/+page.ts
import type { PageLoad } from './$types';
import type { ExerciseData } from '$lib/data2/types';
import exercisesJson from '$lib/data2/exercises/andler.json';
import homoJson from '$lib/data2/exercises/homogenitaet.json';

export const load: PageLoad = () => {
	return {
		exercises: homoJson as ExerciseData
	};
};
