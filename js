const todoForm = document.querySelector("form")
const todoInput = document.getElementById("to-do-input")
const todoUl = document.getElementById("to-do-list")

let allTodos = getTodos()
updateTodolist()

todoForm.addEventListener('submit', function(e){
    e.preventDefault()

    addTodo()
})


function addTodo(){

    const todoText = todoInput.value.trim()
    if(todoText.length > 0){
        allTodos.push(todoText)
        updateTodolist()
        saveTodos()
        
        todoInput.value = ""
    }
    
}

function updateTodolist(){

    todoUl.innerHTML = ""
    allTodos.forEach((todo,todoIdx)=>{

        const todoItem = createTodoList(todo,todoIdx)
        todoUl.append(todoItem)

    })
}

function createTodoList(todo,todoIdx){
    const todoId= "to-do-"+ todoIdx
    const todoLi = document.createElement("li")
    
    todoLi.className = "to-do"
    todoLi.innerHTML = `

    <input type="checkbox" id="${todoId}" />
    <label for="${todoId}" class="custom-checkbox">
        <svg fill="transparent"  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#black"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
    </label>
    <label for="${todoId}" class="to-do-text">
        ${todo}
    </label>
    <button class="dlt-btn">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#black"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/></svg>
    </button>
    
    `
   

    
    const deleteButton = todoLi.querySelector(".dlt-btn")
    deleteButton.addEventListener("click",()=>{

        const checkbox = document.getElementById(todoId);
        if (checkbox.checked){

        deleteTodoItem(todoIdx)
        }else{
            alert("do your work first")
        }
    })
    
    return todoLi

}

function deleteTodoItem(todoIdx){

    allTodos = allTodos.filter((_,i) => i !== todoIdx)
    saveTodos()
    updateTodolist()
}

function saveTodos(){

    const todoJson = JSON.stringify(allTodos)
    localStorage.setItem("todos",todoJson)
    
}
function getTodos(){

    const todos = localStorage.getItem("todos") || "[]"

    return JSON.parse(todos)
}
