export interface Todo {
  id: string;
  categoryId?: string;
  task: string;
  isDone: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}
