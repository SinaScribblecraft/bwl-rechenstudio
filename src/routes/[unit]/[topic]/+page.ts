// src/routes/[unit]/[topic]/+page.ts
import { error } from '@sveltejs/kit';
import { exerciseDatabase } from '$lib/data';

export function load({ params }) {
	const { unit, topic } = params;

	const exerciseData = exerciseDatabase[unit]?.[topic];

	if (!exerciseData) {
		error(404, {
			message: 'Dieses Thema wurde leider nicht gefunden.'
		});
	}

	return {
		unitId: unit,
		topicId: topic,
		exercise: exerciseData
	};
}
