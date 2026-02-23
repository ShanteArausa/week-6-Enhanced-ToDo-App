// ===============================
// DOM ELEMENTS
// ===============================
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const priority = document.getElementById("priority");
const button = document.getElementById("add-btn");
const list = document.getElementById("list");

const filterAll = document.getElementById("filter-all");
const filterActive = document.getElementById("filter-active");
const filterCompleted = document.getElementById("filter-completed");
const clearCompleted = document.getElementById("clear-completed");

// ===============================
// APP STATE
// ===============================
let tasks = [];

// ===============================
// LOCAL STORAGE
// ===============================
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("tasks");
  if (stored) {
    tasks = JSON.parse(stored);
  }
  renderTasks(tasks);
}

// ===============================
// RENDER FUNCTION (CORE)
// ===============================
function renderTasks(taskArray) {
  list.innerHTML = "";

  taskArray.forEach(task => {
    const li = document.createElement("li");
    li.textContent = `${task.text} (${task.priority})`;
    li.style.paddingLeft = "8px";

    // Priority Styling
    if (task.priority === "High") {
      li.style.borderLeft = "6px solid red";
    } else if (task.priority === "Medium") {
      li.style.borderLeft = "6px solid orange";
    } else {
      li.style.borderLeft = "6px solid green";
    }

    if (task.completed) {
      li.classList.add("completed");
    }

    // Toggle Complete
    li.addEventListener("click", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks(tasks);
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks(tasks);
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// ===============================
// ENABLE BUTTON
// ===============================
input.addEventListener("input", () => {
  button.disabled = input.value.trim() === "";
});

// ===============================
// ADD TASK
// ===============================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value.trim() === "") return;

  const newTask = {
    id: Date.now(),
    text: input.value,
    priority: priority.value,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks(tasks);

  input.value = "";
  priority.value = "Medium";
  button.disabled = true;
});

// ===============================
// FILTERS
// ===============================
filterAll.addEventListener("click", () => {
  renderTasks(tasks);
});

filterActive.addEventListener("click", () => {
  const active = tasks.filter(task => !task.completed);
  renderTasks(active);
});

filterCompleted.addEventListener("click", () => {
  const completed = tasks.filter(task => task.completed);
  renderTasks(completed);
});

clearCompleted.addEventListener("click", () => {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks(tasks);
});

// ===============================
// INIT
// ===============================
loadTasks();
button.disabled = true;