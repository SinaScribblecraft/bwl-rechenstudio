import type { ExerciseData, UnitMeta } from '$lib/data2/types';
import ke1, { meta as ke1Meta } from './ke1/index.ts';
import ke2, { meta as ke2Meta } from './ke2/index.ts';
import ke3, { meta as ke3Meta } from './ke3/index.ts';
import type { CourseUnit } from '$lib/data2/types';

export const units: Record<string, { meta: UnitMeta; topics: ExerciseData }> = {
	ke1: { meta: ke1Meta, topics: ke1 },
	ke2: { meta: ke2Meta, topics: ke2 },
	ke3: { meta: ke3Meta, topics: ke3 },
};


export const sidebarData: CourseUnit[] = Object.entries(units).map(([unitId, unit]) => ({
	id: unitId,
	title: unit.meta.title,
	icon: unit.meta.icon,
	topics: Object.entries(unit.topics).map(([topicId, topic]) => ({
		id: topicId,
		title: topic.title,
		href: `/${unitId}/${topicId}`
	}))
}));