// src/routes/[unit]/[topic]/+page.ts
import { error } from '@sveltejs/kit';
import { exerciseDatabase } from '$lib/data';

import { units } from '$lib/data2/exercises';

export function load({ params })  {
	// const unit2 = units[params.unit];
	// if (!unit2) throw error(404, `Einheit "${params.unit}" nicht gefunden`);
	//
	// const topic2 = unit2[params.topic];
	// if (!topic2) throw error(404, `Aufgabentyp "${params.topic}" nicht gefunden`);


	const unit2 = units[params.unit];
	if (!unit2) throw error(404, `Einheit "${params.unit}" nicht gefunden`);

	const topic2 = unit2.topics[params.topic]; // ← .topics
	if (!topic2) throw error(404, `Aufgabentyp "${params.topic}" nicht gefunden`);

// old ---
// 	const { unit, topic } = params;
//
// 	const exerciseData = exerciseDatabase[unit]?.[topic];
//
// 	if (!exerciseData) {
// 		error(404, {
// 			message: 'Dieses Thema wurde leider nicht gefunden.'
// 		});
// 	}


	return {
		topic: topic2,
		// unitId: unit,
		// topicId: topic,
		// exercise: exerciseData
	};
}
