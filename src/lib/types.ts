
export type TopicStatus = 'active' | 'inactive';

export type Topic = {
	id: string;
	title: string;
	href: string;
	// status: TopicStatus;
};

export type CourseUnit = {
	id: string;
	title: string;
	icon: string;
	topics: Topic[];
};
