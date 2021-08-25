// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// FUNCTIONS
function addTodo(event) {
  // prevent form from submitting
  event.preventDefault();
  // todo DIV
  const todoDiv = document.createElement("div");
  //   add classname
  todoDiv.classList.add("todo");
  //   create li
  const newTodo = document.createElement("li");
  // append text
  newTodo.innerText = todoInput.value;
  //  add class name to li
  newTodo.classList.add("todo-item");
  //   append newTodo to todoDiv
  todoDiv.appendChild(newTodo);

  // CHECK button
  const completedButton = document.createElement("button");
  // add an icon inside HTML tag
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  //   get completedBUtton and add classname to completedButton
  completedButton.classList.add("complete-btn");
  //   append completedButton to the div
  todoDiv.appendChild(completedButton);

  // delete button
  const deleteButton = document.createElement("button");
  // add an icon inside HTML tag
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  //   get completedBUtton and add classname to completedButton
  deleteButton.classList.add("delete-btn");
  //   append completedButton to the div
  todoDiv.appendChild(deleteButton);

  //   APPEND TO LIST END
  todoList.appendChild(todoDiv);
  //   CLEAR Input value
  todoInput.value = " ";
}

// function to delete
function deleteCheck(event) {
  // assing elements click/targeted to 'item'
  const item = event.target;
  //   if the user clicks on the delete button
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("animate__animated", "animate__fadeOut", "uncompleted");
    todo.addEventListener("animationend", function () {
      todo.remove();
    });
    //   if the user clicks on the check button
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.add("animate__animated", "animate__pulse", "completed");
  }
}

// function for filetering todo list
function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("delete-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}
