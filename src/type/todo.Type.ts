export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type createtodo = Omit<Todo, "id">;
export type UpdateTodo = Partial<createtodo>;
