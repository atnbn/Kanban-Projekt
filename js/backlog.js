let inactiveTasks = [];

/**
 * Fires the functions when side loads
 */
async function init() {
    includeHTML();
    await downloadFromServer();
    loadAllTasks();
    filterTasks()
    showTasks();
    setTimeout(() => { checkUrlShowOnNav(); }, 50)
    checkIfTaskIsActive()
}

function filterTasks() {
    inactiveTasks = allTasks.filter(task => task?.status === 'inactiv')
}

/**
 * This function  shows the added tasks 
 * @param {string} name - this 
 */
function showTasks() {
    showTaskContent();
}

async function showTaskinBoard(taskID) {
    let task = allTasks.find(t => t.id === taskID);
    task.status = 'active';
    await saveToBackendTasks(); // necessary to keep changes
    /* await backend.setItem('allTasks' , JSON.stringify(inactiveTasks)) */
    addPopUp();
    inactiveTasks = allTasks.filter(task => task?.status === 'inactiv')
    showTasks();
    checkIfTaskIsActive();
}
/**
 * This function shows the user picture name and email
 * @param {*} taskIndex 
 */

function showMembers(taskIndex) {
    document.getElementById("members-list" + taskIndex).innerHTML = "";
    for (let i = 0; i < allTasks[taskIndex].assignment.length; i++) {
        document.getElementById("members-list" + taskIndex).innerHTML += `
            <img class="member-pic" src="/${allTasks[taskIndex].assignment[i].img}">
            <div class="user-data">
            <span id="user-name" class="name-email">${allTasks[taskIndex].assignment[i].name}</span>
            <span class="email">${allTasks[taskIndex].assignment[i].email}
            </div>
        `;
    }
}

function addPopUp() {
    document.getElementById('alert').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('alert').classList.add('d-none');
    }, 1000);
}

function editUser(i) {
    document.getElementById('background-container').style.display = 'block';
    document.getElementById('info-box').style.display = 'flex';
    showTaskContent(i)
    showPopUpContent(i)
    showMembers(i)
}

function showTaskContent() {
    let taskRow = document.getElementById('taskRow');
    taskRow.innerHTML = '';
    for (let i = 0; i < inactiveTasks.length; i++) {
        taskRow.innerHTML +=  generateTaskContentHTML(i)
        showMembers(i);
    }
}

function generateTaskContentHTML(i){
    return `
    <div class="history">
        <div class="members-list" id="members-list${i}">
        </div>
        <div class="category">
            <b class="responsiv-category">Category:</b>
            <p class="category1">${inactiveTasks[i].category}</p>
        </div>
        <div class="details-history">
            <b class="responsiv-details">Details:</b>
            <span class="break">${inactiveTasks[i].description}</span>
        </div>
            <img src="/img/edit.png" class="edit-user" onclick="editUser(${i})"></button>
            <button id="showTaskinBoard" class="text-createTask" onclick="showTaskinBoard(${inactiveTasks[i].id})">+</button>
    </div>
`;
}

function showPopUpContent(i) {
    let content = document.getElementById('info-box');
    content.innerHTML = `
        <div class="info-container">
            <button class="close-button" onclick="hideInfo()">X</button>
            <div class="info-header">
                <p class="info-text">Name:</p>
                <span class="info-text">${inactiveTasks[i].assignment}</span>
            </div>
            <div class="info-header">
                <p class="info-text">Category:</p>
                <select id="id-category${i}" class="div-fillIns" required>
                    <option hidden selected>${inactiveTasks[i].category}</option>
                    <option>Management</option>
                    <option>Marketing</option>
                    <option>Product</option>
                    <option>Sale</option>
                </select>
            </div>
            <div class="info-header">
                <p class="info-text">Urgency:</p>
                <select class="select-opitons" id="urgency${i}" required>
                    <option hidden selected>${inactiveTasks[i].urgency}</option>
                    <option>Low</option>
                    <option>Middle</option>
                    <option>High</option>
                </select>
            </div>
            <div class="info-header">
                <p class="info-text">Description:</p>
                <textarea class="info-area" type="text" id="description${i}">${inactiveTasks[i].description}</textarea>
            </div>
    <div class="info-button__container">
                <button class="save-button" onclick="updateUser(${i})">Save</button>
            </div>
        </div>
    `
}

function updateUser(i) {
    let category = document.getElementById('id-category' + i).value;
    let urgency = document.getElementById('urgency' + i).value;
    let description = document.getElementById('description' + i).value;
    inactiveTasks[i].category = category;
    inactiveTasks[i].urgency = urgency;
    inactiveTasks[i].description = description;
    saveToBackendTasks();
    hideInfo();
    showTasks();
}

function hideInfo() {
    document.getElementById('background-container').style = 'display :none';
    document.getElementById('info-box').style = 'display :none';
}

function checkIfTaskIsActive() {
    if (inactiveTasks.length === 0) {
        document.getElementById('taskRow').innerHTML = '<h1 class="notask-info">No tasks added</h1>'
    }
    else {
        showTaskContent();
    }
}