// DOM Elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const filterAll = document.getElementById("filter-all");
const filterActive = document.getElementById("filter-active");
const filterCompleted = document.getElementById("filter-completed");

// App state
let todos = [];

// Render function
function renderTodos(list) {
  todoList.innerHTML = "";

  list.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.dataset.id = task.id;

    if (task.completed) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }

    // Toggle completed on click
    li.addEventListener("click", () => {
      task.completed = !task.completed;
      renderTodos(list);
    });

    todoList.appendChild(li);
  });
}

// Add Task
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = {
    id: Date.now(),
    text: todoInput.value,
    completed: false
  };

  todos.push(task);
  renderTodos(todos);

  todoInput.value = "";
});

// Filters
filterAll.addEventListener("click", () => renderTodos(todos));
filterActive.addEventListener("click", () => renderTodos(todos.filter(t => !t.completed)));
filterCompleted.addEventListener("click", () => renderTodos(todos.filter(t => t.completed)));

// Optional: save/load to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const stored = JSON.parse(localStorage.getItem("todos"));
  if (stored) todos = stored;
  renderTodos(todos);
}

loadTodos();
todoForm.addEventListener("submit", saveTodos);