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

export type DataTable = {
	headers: string[];
	rows: (string | number)[][];
};

export type SolutionStep = {
	title: string;
	description: string;
	math?: string;
	dataTable?: DataTable;
};

export type SubTask = {
	label: string;
	question: string;
	steps: SolutionStep[];
	finalResultText?: string;
	finalResultMath?: string;
};

export type ExerciseData = {
	title: string;
	description: string;
	formulas: FormulaDef[];
	dataTable?: DataTable;
	subTasks: SubTask[];
};

export type ParamDef = {
	symbol: string;
	description: string;
};

export type FormulaDef = {
	name: string;
	result: ParamDef;
	math: string;
	params: ParamDef[];
};

export type TopicData = {
	title: string;
	subtitle: string;
	exercises: ExerciseData[];
};