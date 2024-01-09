export interface ITodo {
	text: string;
	completed: boolean;
	id: string;
	user_id: string;
	created_at: string;
}

export interface INewTodo extends Omit<ITodo, 'id' | 'created_at'> {}
