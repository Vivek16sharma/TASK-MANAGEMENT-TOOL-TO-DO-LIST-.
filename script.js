let currentUser = null;

function register() {
    let u = username.value;
    let p = password.value;

    if (!u || !p) return alert("Fill all fields");

    localStorage.setItem(u, p);
    alert("Registered successfully");
}

function login() {
    let u = username.value;
    let p = password.value;

    if (localStorage.getItem(u) === p) {
        currentUser = u;
        document.querySelector(".auth").classList.add("hidden");
        document.querySelector(".app").classList.remove("hidden");
        loadTasks();
    } else {
        alert("Invalid credentials");
    }
}

function logout() {
    location.reload();
}

function addTask() {
    let task = document.getElementById("task").value;
    let deadline = document.getElementById("deadline").value;

    if (!task || !deadline) return alert("Fill task & deadline");

    let tasks = JSON.parse(localStorage.getItem(currentUser + "_tasks")) || [];
    tasks.push({ task, deadline });
    localStorage.setItem(currentUser + "_tasks", JSON.stringify(tasks));
    loadTasks();
}

function loadTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem(currentUser + "_tasks")) || [];

    tasks.forEach((t, i) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${t.task} <br>
            ⏰ ${t.deadline}
            <button onclick="deleteTask(${i})">Delete</button>
        `;
        list.appendChild(li);

        checkReminder(t.task, t.deadline);
    });
}

function deleteTask(i) {
    let tasks = JSON.parse(localStorage.getItem(currentUser + "_tasks"));
    tasks.splice(i, 1);
    localStorage.setItem(currentUser + "_tasks", JSON.stringify(tasks));
    loadTasks();
}

function checkReminder(task, deadline) {
    let timeDiff = new Date(deadline) - new Date();
    if (timeDiff > 0 && timeDiff < 60000) {
        setTimeout(() => {
            alert("Reminder: " + task);
        }, timeDiff);
    }
}
