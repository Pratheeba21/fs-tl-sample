const inp = document.getElementById("inp");
const add_button = document.getElementById("add_button");
const task_list = document.getElementById("task_list");

const API_URL = "https://backend-7cwv.onrender.com/todos";

window.addEventListener("DOMContentLoaded", function () {
  fetch(API_URL)
    .then((res) => res.json())
    .then((tasks) => {
      tasks.forEach((task) => {
        renderTask(task.tasksDB, task._id, task.completed);
      });
    });
});

add_button.addEventListener("click", function () {
  const task_input = inp.value;
  if (task_input === "") return alert("Please enter a task");

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tasksDB: task_input }),
  })
    .then((res) => res.json())
    .then((newTask) => {
      renderTask(newTask.tasksDB, newTask._id, newTask.completed);
      inp.value = "";
    });
});

function renderTask(text, id, isCompleted) {
  const list_item = document.createElement("li");

  const complete_btn = document.createElement("div");
  complete_btn.className = "complete-btn";

  const task_span = document.createElement("span");
  task_span.className = "task-span";
  task_span.textContent = text;

  const delete_btn = document.createElement("button");
  delete_btn.className = "delete-btn";
  delete_btn.textContent = "Delete";

  if (isCompleted === true) {
    complete_btn.textContent = "✔";
    complete_btn.classList.add("marked");
    task_span.classList.add("completed");
  }

  complete_btn.addEventListener("click", function () {
    let currentlyFinished = complete_btn.textContent === "✔";

    fetch(API_URL + "/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !currentlyFinished }),
    }).then(() => {
      if (complete_btn.textContent === "✔") {
        complete_btn.textContent = "";
      } else {
        complete_btn.textContent = "✔";
      }
      complete_btn.classList.toggle("marked");
      task_span.classList.toggle("completed");
    });
  });

  delete_btn.addEventListener("click", function () {
    fetch(API_URL + "/" + id, { method: "DELETE" }).then(() => {
      task_list.removeChild(list_item);
    });
  });

  list_item.appendChild(complete_btn);
  list_item.appendChild(task_span);
  list_item.appendChild(delete_btn);
  task_list.appendChild(list_item);
}

