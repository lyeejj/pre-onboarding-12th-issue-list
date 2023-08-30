interface Label {
	id: number;
	name: string;
}

export interface IssueListType {
	id: number;
	number: number;
	url: string;
	title: string;
	user: {
		id: number;
		login: string;
	};
	labels: Label[];
	state: string;
	comments: number;
	created_at: string;
	updated_at: string;
	body: string;
}
