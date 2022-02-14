// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const inputBtn = document.querySelector(".input-btn");
const select = document.querySelector("#filter-todo");

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getLocalTodos);
inputBtn.addEventListener("click", createTodo);
select.addEventListener("click", filterTodo);

// FUNCTIONS

// get local stored todos.
function getLocalTodos() {
    let allLocalTodos;
    allLocalTodos = JSON.parse(localStorage.getItem("All todos"));
    if (!allLocalTodos) {
        allLocalTodos = [];
        localStorage.setItem("All todos", JSON.stringify(allLocalTodos));
    } else {
        allLocalTodos.forEach((todo) => {
            createTodoStructure(todo.text, todo.status);
        });
    }
}

// On click 'add', functions are called to create a new todo inside dom and LS.
function createTodo(event) {
    event.preventDefault();
    if (todoInput.value !== "") {
        // Creates new todo in DOM
        createTodoStructure(todoInput.value, false);
    }
    updateLS();
}

// create todo structure
function createTodoStructure(todoContent, todoStatus) {
    // clear input
    todoInput.value = "";

    // create todoContainer
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    // create li
    const todoLi = document.createElement("li");
    todoLi.innerText = todoContent;
    todoLi.classList.add("todo-li");
    todoDiv.appendChild(todoLi);

    // create MARK BUTTON
    const markBtn = document.createElement("button");
    markBtn.innerHTML = '<i class="fas fa-check"></i>';
    markBtn.classList.add("mark-btn");
    todoDiv.appendChild(markBtn);

    // create delete Btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);

    // Append to list
    todoList.appendChild(todoDiv);

    // Add Delete functionality
    deleteBtn.addEventListener("click", deleteTodoDiv);
    function deleteTodoDiv() {
        todoDiv.classList.add("remove-todo");
        todoDiv.addEventListener("transitionend", function () {
            todoDiv.remove();
            updateLS();
        });
    }

    // Add Mark functionality
    markBtn.addEventListener("click", markCompleted);
    function markCompleted() {
        todoDiv.classList.toggle("completed");
        updateLS();
    }

    // completed todos.
    if (todoStatus) {
        todoDiv.classList.add("completed");
    }
}

// When something is completed/removed, updates Local storage.
function updateLS() {
    let allTodos = document.querySelectorAll(".todo-div");
    let allLocalTodos = [];
    localStorage.setItem("All todos", JSON.stringify(allLocalTodos));
    allTodos.forEach((todoDiv) => {
        console.log(todoDiv.childNodes[0].innerText);
        allLocalTodos.push({
            text: todoDiv.childNodes[0].innerText,
            status: todoDiv.classList.contains("completed"),
        });
    });
    localStorage.setItem("All todos", JSON.stringify(allLocalTodos));
}

// Filter functionality.
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
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
