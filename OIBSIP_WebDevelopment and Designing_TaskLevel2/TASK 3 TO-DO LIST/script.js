let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){
    const input = document.getElementById("taskInput");
    if(input.value.trim() === "") return;

    tasks.push({
        text: input.value,
        done:false,
        time:new Date().toLocaleString()
    });

    input.value="";
    saveTasks();
    renderTasks();
}

function editTask(index){
    const newText = prompt("Edit task:", tasks[index].text);
    if(newText){
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    renderTasks();
}

function toggleTask(index){
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function renderTasks(){
    const pending = document.getElementById("pendingList");
    const completed = document.getElementById("completedList");

    pending.innerHTML="";
    completed.innerHTML="";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        const left = document.createElement("div");
        left.innerHTML = `
            <div class="${task.done ? 'completed':''}">${task.text}</div>
            <div class="task-info">${task.time}</div>
        `;

        const right = document.createElement("div");

        const doneBtn = document.createElement("button");
        doneBtn.textContent="✔";
        doneBtn.className="done";
        doneBtn.onclick=()=>toggleTask(index);

        const editBtn = document.createElement("button");
        editBtn.textContent="Edit";
        editBtn.className="edit";
        editBtn.onclick=()=>editTask(index);

        const delBtn = document.createElement("button");
        delBtn.textContent="X";
        delBtn.className="delete";
        delBtn.onclick=()=>deleteTask(index);

        right.append(doneBtn, editBtn, delBtn);
        li.append(left,right);

        if(task.done) completed.appendChild(li);
        else pending.appendChild(li);
    });

    updateCount();
}

function updateCount(){
    const total = tasks.length;
    const completed = tasks.filter(t=>t.done).length;
    const pending = total - completed;

    document.getElementById("taskCount").textContent =
    `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
}

document.getElementById("taskInput").addEventListener("keypress",function(e){
    if(e.key==="Enter") addTask();
});

renderTasks();