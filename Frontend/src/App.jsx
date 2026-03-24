import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://backend-7cwv.onrender.com/todos";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const addTask = () => {
    if (inputValue.trim() === "") return alert("Please enter a task");

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tasksDB: inputValue }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks([...tasks, newTask]);
        setInputValue("");
      });
  };

  const toggleComplete = (id, currentStatus) => {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !currentStatus }),
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
      });
  };

  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() => {
      setTasks(tasks.filter((t) => t._id !== id));
    });
  };

  return (
    <div className="container">
      <h1>Add your tasks</h1>
      <input
        type="text"
        placeholder="Add a task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button id="add_button" onClick={addTask}>
        Add the task
      </button>

      <ul id="task_list">
        {tasks.map((task) => (
          <li key={task._id}>
            <div
              className={`complete-btn ${task.completed ? "marked" : ""}`}
              onClick={() => toggleComplete(task._id, task.completed)}>
              {task.completed ? "✔" : ""}
            </div>

            <span className={`task-span ${task.completed ? "completed" : ""}`}>
              {task.tasksDB}
            </span>

            <button className="delete-btn" onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


// import Header from "./Header";
// function App() {

//   return (
//     <div>
//       <Header/>
//     </div>
//   );
// }

// export default App;


// import { useState } from "react";
// import "./App.css"
// function App(){
//   const [task, setTask] = useState("");
//   const [taskList, setTaskList] = useState([]);

//   const taskchage= (event) => {
//     setTask(event.target.value);
//   }

//   const displaytask = () => {
//     setTaskList([...taskList, task]);
//     setTask("");
//   }

//   const deleteTask = (index) => {
//     const newList = taskList.filter((_, ind) => ind !== index);
//     setTaskList(newList);
//   };

//   return (
//     <div className="container">
//       <h1> Add the task</h1>
//       <input value={task} onChange={taskchage} />
//       <button className="add_button" onClick={displaytask}>
//         Add
//       </button>
//       <ul>
//         {taskList.map((currentTask, index) => (
//           <li key={index}>
//             <div className="complete-btn"></div>
//             <span className="task-text">{currentTask}</span>
//             <button className="delete-btn " onClick={() => deleteTask(index)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
