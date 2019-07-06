// Select all elements

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const FirstCardBody = document.querySelectorAll(".card-body")[0];
const SecondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();

// Event listeners
function eventListeners(){

    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    SecondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){

    if(confirm("Are you sure you want to delete all todos ?")){
        // Remove todos from UI
        
        //todoList.innerHTML = ""; // Slower way

        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
    
        }

        localStorage.removeItem("todos");
    }
  
}

function filterTodos(e){

    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filterValue) === -1 ){
            listItem.setAttribute("style","display : none !important ");
        }else{
            listItem.setAttribute("style","display : block  ")
        }
    })

}

function deleteTodo(e){

    if (e.target.className === "fa fa-remove"){
            e.target.parentElement.parentElement.remove();
            deleteTodosFromStorage(e.target.parentElement.parentElement.textContent);
            showAlert("success","Başarıyla Silindi");
            e.preventDefault();
    }
}

function deleteTodosFromStorage(deleteTodo){

    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo === deleteTodo){
            todos.splice(index,1); // Delete value from array
        }
    })

    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}




function addTodo(e){

    const newTodo = todoInput.value.trim();

    if (newTodo === ""){

        showAlert("danger","Please enter todo");

    }else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Succesfully added");
    }

    e.preventDefault();

}

// This func gets Todos from storage
function getTodosFromStorage(){
        let todos;

        if ( localStorage.getItem("todos") === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        return todos;
}


function addTodoToStorage(newTodo){

let todos = getTodosFromStorage();

todos.push(newTodo);

localStorage.setItem("todos",JSON.stringify(todos));

}





function showAlert(type,message){

    const alert = document.createElement("div");
    
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    FirstCardBody.appendChild(alert);

    // setTimeout

    setTimeout(function(){
        alert.remove();
    },1000)

}



function addTodoToUI(newTodo){ // Adds string to ui as list item

    // Create List item
    const listItem = document.createElement("li");

    // Create Link
    const link = document.createElement("a");

    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";

    // Add text node

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Add list item to todo list

    todoList.appendChild(listItem);
    todoInput.value = ""; // Clear Todo input
}
