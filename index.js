const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");
const errorTask = document.getElementById("error");
const todosError = document.getElementById("todos-error");
const btns = document.getElementById("hide-div");

// Load tasks from localStorage when the page loads START here
document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    savedTasks.forEach((task) => {
      createTaskElement(task);
    });
  } else {
    btns.classList.add("filtered-hide");
    errorTask.textContent = "Please Add your new task here";
  }
});
// Load tasks from localStorage when the page loads END here

// sorte4d button Start here
document.getElementById("sortBy").addEventListener("click", () => {
  const tasks = Array.from(taskList.getElementsByTagName("li"));

  tasks.sort((a, b) => {
    const textA = a.textContent.toLocaleLowerCase();
    const textB = b.textContent.toLocaleLowerCase();

    return textA.localeCompare(textB);
  });
  // Append sorted tasks to the list
  tasks.forEach((task) => {
    taskList.appendChild(task);
  });
});
// sorte4d button Start here

let editingTaskItem = null;

// submitted form START here
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!editingTaskItem) {
    addTask();
  }
});
// submitted form END here

// showMesage START here
const showMessage = (text, state) => {
  errorTask.innerText = text;
  errorTask.classList.add(`bg-${state}`);
  setTimeout(() => {
    errorTask.classList.remove(`bg-${state}`);
    errorTask.innerText = "";
  }, 2000);
};
// showMesage END here

// all clear confirm button START  here
const allClear = (sucssesMessage, action) => {
  let isConfirm = confirm("Are you sure ?");
  if (!isConfirm) {
    alert("Delete Unsuccessfully");
  } else {
    action();
    alert(sucssesMessage);
    showMessage(sucssesMessage, "delete");
  }
};
// all clear confirm button END  here

let count = 0;

// Add new todo part START here
const addTask = () => {
  const task = taskInput.value.trim();
  if (!task) {
    showMessage("Please input something", "delete");
    return;
  }

  btns.classList.remove("filtered-hide");

  // Save tasks to localStorage
  createTaskElement(task);
  saveTasksToLocalStorage();
  // Save tasks to localStorage

  //   clear input and error
  taskInput.value = "";
  errorTask.innerText = "";
  showMessage("Todos added sucssesfull", "sucsses");
};
// Add new todo part END here

// Create task element START here
const createTaskElement = (taskContent) => {
  //   creating new task list START here
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  const taskContentElement = document.createElement("span");
  taskContentElement.className = "task-content";
  taskContentElement.textContent = taskContent;

  // If savedTime is null (not saved before), save the current time
  // let savedTime = localStorage.getItem("savedTime");
  // if (!savedTime) {
  //   savedTime = new Date().toLocaleTimeString();
  //   localStorage.setItem("savedTime", savedTime);
  // }
  // localStorage.getItem("savedTime");

  // Create a time span and set its text to the saved time
  const timeSpan = document.createElement("span");
  timeSpan.innerText = new Date().toLocaleTimeString();
  // Create a time span and set its text to the saved time

  // edit button create
  const editButton = document.createElement("button");
  editButton.id = "edit";
  editButton.innerText = "Edit";
  // edit button create

  // delete button create
  const deleteButton = document.createElement("button");
  deleteButton.id = "delete";
  deleteButton.innerText = "Delete";
  //  delete button create

  //   creating new task list END here

  //   appenchqaild start here
  taskItem.appendChild(taskContentElement);
  taskItem.appendChild(timeSpan);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  // appendchild END here

  //   insert new task in ul
  taskList.insertAdjacentElement("afterbegin", taskItem);
  //   insert new task in ul

  // Remove the task from local storage START here
  deleteButton.addEventListener("click", () => {
    allClear("Todo is Deleted", () => {
      taskList.removeChild(taskItem);
      const savedTasks = JSON.parse(localStorage.getItem("tasks"));
      const updateTasks = savedTasks.filter(
        (savedTask) => savedTask !== taskContent
      );
      localStorage.setItem("tasks", JSON.stringify(updateTasks));
    });
  });
  // Remove the task from local storage END here
};
// Create task element END here

//   save localstorage START here
const saveTasksToLocalStorage = () => {
  const tasks = Array.from(taskList.querySelectorAll(".task-content")).map(
    (task) => task.textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
//   save localstorage END here

//   clear localstorage START here
document.getElementById("clear").addEventListener("click", () => {
  allClear("All Clear is Done", () => {
    localStorage.clear();
    btns.classList.add("filtered-hide");
    taskList.innerHTML = "";
  });
});
//   clear localstorage END here
