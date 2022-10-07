let currentDraggedElement;

async function init() {
    includeHTML();
    await downloadFromServer(); //necessary to use "allTasks"
    loadAllTasks(); //necessary to use "allTasks"
    setTimeout(() => { checkUrlShowOnNav(); }, 50)
    updateHTML();
    // canvasInfo = canvas.getBoundingClientRect();
}

/**
 * Shows the tickets in the respective column 
 */
function updateHTML() {
    showTodo()
    showInProgress()
    showCodeReview()
    showDone()
}

function showTodo() {
    let todo = allTasks.filter(t => t['board'] == 'todo' && t['status'] == 'active'); //allTask = array in script.js, active bc of backlog
    document.getElementById('boardColumnToDo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('boardColumnToDo').innerHTML +=
            `<div id="taggingfromBacklog" class="task-container">
            <div class="button-container">
                <img onclick="moveTaskToNextStage(${element.id})" class="move-right-img" src="/img/icons8-arrow-26.png">
                <img onclick="deleteTask(${element.id})" class="close-img" src="/img/icons8-close-30 (2).png">
            </div>
            <table draggable="true" ondragstart="startDragging(${element['id']})" id="${i}"
                onclick="openPopup(${element['id']})" class="task-board">
                <tr>
                    <td>Title:</td>
                    <td>${element.title}</td>
                </tr>
                <tr>
                    <td>Due to:</td>
                    <td>${element.date}</td>
                </tr>
                <tr>
                    <td>Assigned to:</td>
                    <td>${element.assignment}</td>
                </tr>
            </table>
        </div>
            `;
    }
}

function showInProgress() {
    let inProgress = allTasks.filter(t => t['board'] == 'inProgress');
    document.getElementById('boardColumnInProgress').innerHTML = '';
    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('boardColumnInProgress').innerHTML += `
            <div class="task-container">
                <div class="button-container">
                    <div class="arrow-containers">
                        <img onclick="moveTaskBack(${element.id})" class="move-right-img mirror" src="/img/icons8-arrow-26.png">
                            <img onclick="moveTaskToNextStage(${element.id})" class="move-right-img" src="/img/icons8-arrow-26.png">
                            </div>
                            <img onclick="deleteTask(${element.id})" class="close-img" src="/img/icons8-close-30 (2).png">
                            </div>
                            <table draggable="true" ondragstart="startDragging(${element['id']})" id="${i}"
                                onclick="openPopup(${element['id']})" class="task-board">
                                <tr>
                                    <td>Title:</td>
                                    <td>${element.title}</td>
                                </tr>
                                <tr>
                                    <td>Due to:</td>
                                    <td>${element.date}</td>
                                </tr>
                                <tr>
                                    <td>Assigned to:</td>
                                    <td>${element.assignment}</td>
                                </tr>
                            </table>
                    </div>
                    `;
    }
}

function showCodeReview() {
    let codeReview = allTasks.filter(t => t['board'] == 'codeReview');
    document.getElementById('boardColumnCodeReview').innerHTML = '';
    for (let i = 0; i < codeReview.length; i++) {
        const element = codeReview[i];
        document.getElementById('boardColumnCodeReview').innerHTML += `
            <div class="task-container">
                <div class="button-container">
                    <div class="arrow-containers">
                        <img onclick="moveTaskBack(${element.id})" class="move-right-img mirror" src="/img/icons8-arrow-26.png">
                            <img onclick="moveTaskToNextStage(${element.id})" class="move-right-img" src="/img/icons8-arrow-26.png">
                            </div>
                            <img onclick="deleteTask(${element.id})" class="close-img" src="/img/icons8-close-30 (2).png" >
                            </div>
                            <table draggable="true" ondragstart="startDragging(${element['id']})" id="${i}" onclick="openPopup(${element['id']})" class="task-board">
                                <tr>
                                    <td>Title:</td>
                                    <td>${element.title}</td>

                                </tr>
                                <tr>
                                    <td>Due to:</td>
                                    <td>${element.date}</td>
                                </tr>
                                <tr>
                                    <td>Assigned to:</td>
                                    <td>${element.assignment}</td>
                                </tr>
                            </table>
                    </div>
                    `;
    }
}

function showDone() {
    let done = allTasks.filter(t => t['board'] == 'done');
    document.getElementById('boardColumnDone').innerHTML = '';
    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('boardColumnDone').innerHTML += `
            <div class="task-container">
                <div class="button-container">
                    <div class="arrow-containers">
                        <img onclick="moveTaskBack(${element.id})" class="move-right-img mirror" src="/img/icons8-arrow-26.png">
                    </div>
                    <img onclick="deleteTask(${element.id})" class="close-img" src="/img/icons8-close-30 (2).png" >
                </div>
                <table draggable="true" ondragstart="startDragging(${element['id']})" id="${i}" onclick="openPopup(${element['id']})" class="task-board">
                    <tr>
                        <td>Title:</td>
                        <td>${element.title}</td>
                    </tr>
                    <tr>
                        <td>Due to:</td>
                        <td>${element.date}</td>
                    </tr>
                    <tr>
                        <td>Assigned to:</td>
                        <td>${element.assignment}</td>
                    </tr>
                </table>
            </div>
        `;
    }
}

/**
 * Passes the id to the global variable "currentDraggedElement"
 * @param {number} id - individual number to seperate the tickets
                    */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * Allows the tickets to drop into the div
 * @param {string} ev - enables to run the function
                    */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Tickets with the id of the current dragged element gets new category
 * @param {string} category - placeholder variable for toDo/inProgress/codeReview/done
                    */
async function moveTo(category) {
    allTasks.find(t => t.id === currentDraggedElement)['board'] = category;
    updateHTML();
    await saveToBackendTasks();
}

function setID() {
    for (let i = 0; i < allTasks.length; i++) {
        allTasks[i]['id'] = i;
    }
}

async function deleteTask(id) {
    let task = allTasks.find(t => t.id === id);
    let pos = allTasks.indexOf(task);
    allTasks.splice(pos, 1)
    await saveToBackendTasks();
    updateHTML();
}

function openPopup(id) {
    let task = allTasks.find(t => t.id === id);
    let pos = allTasks.indexOf(task);
    let content = document.getElementById('info-box');
    document.getElementById('popup').style.display = 'flex';
    content.innerHTML = loadPopUpContent(pos)
}

function updateUser(i) {
    let category = document.getElementById('category' + i).value
    let urgency = document.getElementById('urgency' + i).value;
    let description = document.getElementById('description' + i).value;
    allTasks[i].category = category;
    allTasks[i].urgency = urgency;
    allTasks[i].description = description;
    saveToBackendTasks();
    closePopup();
    updateHTML();
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

moveTaskToNextStage = async (id) => {
    let task = allTasks.find(t => t.id === id);
    let pos = allTasks.indexOf(task);
    if (allTasks[pos].board === 'todo') {
        allTasks[pos].board = 'inProgress';
    }
    else if (allTasks[pos].board == 'inProgress') {
        allTasks[pos].board = 'codeReview';
    } else if (allTasks[pos].board == 'codeReview') {
        allTasks[pos].board = 'done';
    }
    await saveToBackendTasks();
    updateHTML();
}

moveTaskBack = async (id) => {
    let task = allTasks.find(t => t.id === id);
    let pos = allTasks.indexOf(task);
    if (allTasks[pos].board === 'inProgress') {
        allTasks[pos].board = 'todo';
    }
    else if (allTasks[pos].board == 'codeReview') {
        allTasks[pos].board = 'inProgress';
    } else if (allTasks[pos].board == 'done') {
        allTasks[pos].board = 'codeReview';
    }
    console.log('moving back');

    await saveToBackendTasks();
    updateHTML();
}

function removeResponsivMenu() {
    document.getElementById('id-sidebarFullscreen').style.display = 'none';
}

function loadPopUpContent(pos) {
    return `
        <div class="info-container">
            <button class="close-button" onclick="closePopup()">X</button>
            <div class="info-header">
                <p class="info-text">Name:</p>
                <span class="info-text">${allTasks[pos].assignment}</span>
            </div>
            <div class="info-header">
                <p class="info-text">Category:</p>
                <select id="category${pos}" class="div-fillIns" required>
                    <option hidden selected>${allTasks[pos].category}</option>
                    <option>Management</option>
                    <option>Marketing</option>
                    <option>Product</option>
                    <option>Sale</option>
                </select>
            </div>
            <div class="info-header">
                <p class="info-text">Urgency:</p>
                <select class="select-opitons" id="urgency${pos}" required>
                    <option hidden selected>${allTasks[pos].urgency}</option>
                    <option>Low</option>
                    <option>Middle</option>
                    <option>High</option>
                </select>
            </div>
            <div class="info-header">
                <p class="info-text">Description:</p>
                <textarea class="info-area" type="text" id="description${pos}">${allTasks[pos].description}</textarea>
            </div>
            <div class="info-button__container">
                <button class="save-button" onclick="updateUser(${pos})">Save</button>
            </div>
        </div>
        `
}