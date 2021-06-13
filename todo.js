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
    addTodoToUI(newTodo)
    e.preventDefault()
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
console.log('selam')