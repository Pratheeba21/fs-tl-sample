// const inp = document.getElementById("inp");
// const add_button = document.getElementById("add_button");
// const task_list = document.getElementById("task_list");

// add_button.addEventListener("click", function () {
//   const task_input = inp.value;

//   if (task_input === "") {
//     alert("Please enter a task");
//     return;
//   }

//   renderTask(task_input);

//   inp.value = "";
// });

// function renderTask(text) {
//   const list_item = document.createElement("li");

//   const complete_btn = document.createElement("div");
//   complete_btn.className = "complete-btn";

//   const task_span = document.createElement("span");
//   task_span.className = "task-span";
//   task_span.textContent = text;

//   const delete_btn = document.createElement("button");
//   delete_btn.className = "delete-btn";
//   delete_btn.textContent = "Delete";

//   complete_btn.addEventListener("click", function () {
//     if (complete_btn.textContent === "✔") {
//       complete_btn.textContent = "";
//     } else {
//       complete_btn.textContent = "✔";
//     }
//     complete_btn.classList.toggle("marked");
//     task_span.classList.toggle("completed");
//   });

//   delete_btn.addEventListener("click", function () {
//     task_list.removeChild(list_item);
//   });

//   list_item.appendChild(complete_btn);
//   list_item.appendChild(task_span);
//   list_item.appendChild(delete_btn);
//   task_list.appendChild(list_item);
// }



const inp = document.getElementById("inp");

const add_button = document.getElementById("add_button");

const task_list = document.getElementById("task_list");

const API_URL = "http://localhost:3000/todos";

window.addEventListener("DOMContentLoaded", function(){
  fetch(API_URL)
  .then( (res) => res.json())
  .then( (tasks) =>{
    tasks.forEach( (task) => {
      create_task_list(task.userTask, task._id, task.completed);
    });
  });
});

add_button.addEventListener("click", function () {
  const task_input = inp.value;

  if (task_input === "") {
    alert("Please enter a task");
    return;
  }

  fetch(API_URL, {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify({userTask : task_input}),
  })
  .then((res) =>{ res.json()})
  .then((newTask) => {create_task_list(newTask.userTask,newTask._id, newTask.completed)
  inp.value = "";
  });

});

function create_task_list(task_value, task_id, task_complete) {
  const list_item = document.createElement("li");

  const complete_btn = document.createElement("div");
  complete_btn.className = "complete-btn";

  const task_span = document.createElement("span");
  task_span.className = "task-span";
  task_span.textContent = task_input;

  const delete_btn = document.createElement("button");
  delete_btn.className = "delete-btn";
  delete_btn.textContent = "Delete";

  if(task_complete === true){
    complete_btn.textContent === "✔";
    complete_btn.classList.toggle("marked");
    task_span.classList.toggle("completed");
  }

  complete_btn.addEventListener("click", function () {
    let finished = complete_btn.textContent === "✔";
    fetch(API_URL + "/" + task_id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !finished }),
    })
    .then( () =>  {
        if (complete_btn.textContent === "✔") {
          complete_btn.textContent = "";
        } else {
          complete_btn.textContent = "✔";
        }
        complete_btn.classList.toggle("marked");
        task_span.classList.toggle("completed");
    } );
  });

  delete_btn.addEventListener("click", function () {
      fetch(API_URL + "/" + task_id, {method : "DELETE"}).then(() => {
        task_list.removeChild(list_item);
      });

  });

  list_item.appendChild(complete_btn);
  list_item.appendChild(task_span);
  list_item.appendChild(delete_btn);

  task_list.appendChild(list_item);
}
