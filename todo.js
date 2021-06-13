// Element Section
const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo")
const todoList = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
const clearButton = document.querySelector("#clear-todos")

eventListeners()

function eventListeners(){ // All event listeners
    form.addEventListener("submit",addTodo)
}



function addTodo(e){
    const newTodo = todoInput.value.trim() // We deleted the leading and trailing spaces
    

    if (newTodo === ""){
        showAlert("danger", "Lütfen Bir Todo Girin...")
    }
    else{
        addTodoToUI(newTodo)
        addTodoToStorage(newTodo)
        showAlert("success","Todo Başarıyla Eklendi...")
    }
    e.preventDefault()
}


function getTodosFromStorage(){ // Will Retrieve Todos from Storage
    let todos 

    if(localStorage.getItem("todos") === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
} 

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage()

    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function showAlert(type,message){
    const alert = document.createElement("div")

    alert.className = `alert alert-${type}`
    alert.textContent = message

    firstCardBody.appendChild(alert)

    // setTimeout
    setTimeout(() => {
        alert.remove()
    }, 1000); 
}




function addTodoToUI(newTodo){ // It will add the String value to the UI as a List item.

   // Creating List Item
   const listItem = document.createElement("li")

   // Creating Links
   const link = document.createElement("a")
   link.hrek = "#"
   link.className = "delete-item"
   link.innerHTML = "<i class = 'fa fa-remove'></i>"

   listItem.className = "list-group-item d-flex justify-content-between"

   // Add Text Node
   listItem.appendChild(document.createTextNode(newTodo))
   listItem.appendChild(link)

   // Add ListItem to Todo List
   todoList.appendChild(listItem)
   todoInput.value = ""
}
