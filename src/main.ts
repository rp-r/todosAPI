import "../src/assets/App.scss";
import type { Todo } from "../src/type/todo.Type";
import { deltodo, gettodos, newtodo, updateT } from "./services/todosAPI";

const todoul = document.getElementById("listgroup") as HTMLUListElement;
const todoform = document.querySelector("#input-form") as HTMLFormElement;
const todoinput = document.querySelector("#input-text") as HTMLInputElement;

let todos: Todo[] = [];

const renderui = async () => {
  todos = await gettodos();

  render();
};

todoform.addEventListener("submit", async (e) => {
  e.preventDefault();
  let trimmed = todoinput.value.trim();
  if (trimmed.length < 3) return "<p>Data must be less then 3 charaters</p>";

  await newtodo({ title: trimmed, completed: true });

  todoinput.value = "";
  await renderui();
});

todoul.addEventListener("click", async (e) => {
  e.preventDefault();
  const target = e.target as HTMLElement;

  if (target.tagName === "INPUT") {
    // console.log("Input:" + target.closest("li"));
    const todoId = target.closest("li")!.dataset.todoId;
    console.log("id:" + todoId);
  } else if (target.dataset.action === "delete") {
    //console.log(target);
    let todoId = target.closest("li")!.dataset.todoId;
    console.log(todoId);
    await deltodo(todoId);
    await renderui();
  } else if (target.dataset.action === "edit") {
    let todoId = target.closest("li")!.dataset.todoId;

    const todo = todos.find((i) => i.id === todoId);
    if (!todo) {
      return;
    }
    console.log(todo);
    console.log(todo.title);

    const text = prompt("Enter new title", todo.title);
    if (!text) {
      return;
    }

    await updateT(todo.id, { title: text });
    await renderui();
  }

  // console.log(e.target);
});

const render = () => {
  todoul.innerHTML = todos
    .map((todo) => {
      return `<li class="list-group-item d-flex justify-content-between" data-todo-id=${todo.id}>
           
      
      
      
            <input type="checkbox" name="" id="list-todo" ${todo.completed ? "checked" : ""} />
            <span>${todo.title}</span>
        
          <button class="btn btn-primary btn-sm" data-action="edit">Edit</button>
          <button class="btn btn-secondary btn-sm" data-action="delete">Delete </button>
            </li>
          `;
    })
    .join("");
};

renderui();
