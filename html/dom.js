console.log("JavaScript Loaded");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Add Task
function addTask() {

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <span class="task">${taskText}</span>

        <div class="buttons">
            <button class="edit" onclick="editTask(this)">Edit</button>
            <button class="delete" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    taskList.appendChild(li);

    taskInput.value="";
    taskInput.focus();
}

// Delete Task
function deleteTask(button){

    button.parentElement.parentElement.remove();

}

// Edit Task
function editTask(button){

    const task = button.parentElement.previousElementSibling;

    const newTask = prompt("Edit your task:", task.innerText);

    if(newTask !== null && newTask.trim() !== ""){
        task.innerText = newTask;
    }

}

// Press Enter to Add Task
taskInput.addEventListener("keypress",function(e){

    if(e.key==="Enter"){
        addTask();
    }

});