const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");
const errorTask = document.getElementById("error");
const todosError = document.getElementById("todos-error");

// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    savedTasks.forEach((task) => {
      createTaskElement(task);
    });
  }
});

let editingTaskItem = null;

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!editingTaskItem) {
    addTask();
  }
});

let count = 0;
const addTask = () => {
  const task = taskInput.value.trim();
  if (!task) {
    count++;
    errorTask.innerText = `Please input something. Wrong try ${count} times`;
    return;
  }

  // Create task element
  createTaskElement(task);
  // Save tasks to localStorage
  saveTasksToLocalStorage();

  //   clear input and error
  taskInput.value = "";
  errorTask.innerText = "";
};

const createTaskElement = (taskContent) => {
  //   creating new task list START here
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  const taskContentElement = document.createElement("span");
  taskContentElement.className = "task-content";
  taskContentElement.textContent = taskContent;

  const editButton = document.createElement("button");
  editButton.id = "edit";
  editButton.innerText = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.id = "delete";
  deleteButton.innerText = "Delete";
  //   creating new task list END here

  //   appenchqaild start here
  taskItem.appendChild(taskContentElement);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  // appendchild END here

  //   insert new task in ul
  taskList.insertAdjacentElement("afterbegin", taskItem);
  deleteButton.addEventListener("click", () => {
    localStorage.removeItem("task");
  });
};

//   save localstorage
const saveTasksToLocalStorage = () => {
  const tasks = Array.from(taskList.querySelectorAll(".task-content")).map(
    (task) => task.textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

document.getElementById("clear").addEventListener("click", () => {
  localStorage.clear();
  taskList.innerHTML = "";
});
