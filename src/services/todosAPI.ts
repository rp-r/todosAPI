import { update } from "./../../../todos/src/services/todosAPI";
import type { createtodo, Todo, UpdateTodo } from "../type/todo.Type";
import { json } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

export const gettodos = async () => {
  const response = await fetch(`${BASE_URL}/todos`);
  if (!response.ok) {
    throw new Error("Not a valid address");
  }

  return (await response.json()) as Todo[];
};

export const newtodo = async (payload: createtodo) => {
  const respone = await fetch(BASE_URL + "/todos/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return (await respone.json()) as Todo;
};

export const deltodo = async (id: string) => {
  const respone = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });

  return respone;
};

export const updateT = async (id: string, payload: UpdateTodo) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
};
