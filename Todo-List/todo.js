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
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI)
    secondCardBody.addEventListener("click", deleteTodo)
    secondCardBody.addEventListener("click", checkTodo)
    filter.addEventListener("keyup", filterTodos)
    clearButton.addEventListener("click", clearAllTodos)
}



function checkTodo(e){
    if(e.target.className === "fa fa-check"){
        showAlert("success", "Todo Başarıyla Tamamlandı")
        e.target.parentElement.parentElement.setAttribute("style", "background: green")
        // e.target.parentElement.parentElement.setAttribute("style", "text-decoration: line-through;")
    } 
    console.log(e.target)
}

function clearAllTodos(e){
    
    if(confirm("Tümünü Silmek İstediğinize Emin Misiniz")){
        // Arayüzden todoları temizleme
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild)
        }
        localStorage.removeItem("todos")
    }
}



function filterTodos(e){
    const filterValue = e.target.value.toLowerCase()
    const listItems = document.querySelectorAll(".list-group-item")

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase()
        if(text.indexOf(filterValue) === -1){
            // Could not find

            listItem.setAttribute("style", "display : none !important")
        }
        else{
            listItem.setAttribute("style", "display : block")
        }
    })  
}


function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success", "Todo Başarıyla Silindi")
    }
        
}

function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage()
    
    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1) // We can delete the value from the array.
        }
    }) 

    localStorage.setItem("todos", JSON.stringify(todos))
}


function loadAllTodosToUI(){
    let todos = getTodosFromStorage()

    todos.forEach(todo => {
        addTodoToUI(todo)
        
    });
}


function addTodo(e){
    const newTodo = todoInput.value.trim() // We deleted the leading and trailing spaces
    let todos = getTodosFromStorage()
    let isThere = false
    
    todos.forEach(function (item){
        if(item.indexOf(newTodo) != -1) {
            isThere = true
        }
    })
    
    if (newTodo === ""){
        showAlert("danger", "Lütfen Bir Todo Girin...")
    }
    else if (isThere){
        showAlert("danger", "Aynısını Daha Önce Eklediniz...")
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
   link.href = "#"
   link.className = "delete-item"
   link.innerHTML = "<i class = 'fa fa-remove' ></i> <i class='fa fa-check' aria-hidden='true'' style='margin-left: 10px; color: green;' ></i>"


   listItem.className = "list-group-item d-flex justify-content-between"
   listItem.style = "align-items: center;"

   // Add Text Node
   listItem.appendChild(document.createTextNode(newTodo))
   listItem.appendChild(link)

   // Add ListItem to Todo List
   todoList.appendChild(listItem)
   todoInput.value = ""
}

function sameInput(){

}