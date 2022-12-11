let inactiveTasks = [];
/**
 * Fires the functions when side loads
 */
async function init() {
    includeHTML();
    await downloadFromServer();
    loadAllSignIns()
    loadAllTasks();
    filterTasks()
    showTaskContent();
    // setTimeout(() => { checkUrlShowOnNav(); }, 50)
    checkIfTaskIsActive()
}


document.addEventListener('keydown', function (e) {
    const background = document.getElementById('background-container')
    const content = document.getElementById('info-box');
    if (e.key === 'Escape') {
        background.classList.add('d-none')
        content.classList.add('d-none')
        console.log('works');
    }
})










function filterTasks() {
    inactiveTasks = allTasks.filter(task => task?.status === 'inactiv')
}


async function showTaskinBoard(taskID) {
    let task = allTasks.find(t => t.id === taskID);
    task.status = 'active';
    await saveToBackendTasks(); // necessary to keep changes
    addPopUp();
    inactiveTasks = allTasks.filter(task => task?.status === 'inactiv')
    showTaskContent();
    checkIfTaskIsActive();
}


// closeBtn.addEventListener('click', function () {
//     backgroundContainer.classList.add('d-none')
//     console.log('worke');
// })

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
    // showMembers(i)
}

function showTaskContent() {
    let taskRow = document.getElementById('taskRow');
    taskRow.innerHTML = '';
    for (let i = 0; i < inactiveTasks.length; i++) {
        taskRow.innerHTML += generateTaskContentHTML(i)
        // showMembers(i);
    }
}


function showPopUpContent(i) {
    const content = document.getElementById('info-box');
    content.innerHTML = generatePopUpContent(i)
}

function updateUser(i) {
    let category = document.getElementById('id-category' + i).value;
    let urgency = document.getElementById('urgency' + i).value;
    let description = document.getElementById('description' + i).value;
    let date = document.getElementById('date' + i).value;
    inactiveTasks[i].category = category;
    inactiveTasks[i].urgency = urgency;
    inactiveTasks[i].description = description;
    inactiveTasks[i].date = date;
    saveToBackendTasks();
    hideInfo();
    showTaskContent();

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





























function showMembers(taskIndex) {
    document.getElementById("members-list" + taskIndex).innerHTML = "";
    for (let i = 0; i < allTasks[taskIndex].assignment.length; i++) {
        document.getElementById("members-list" + taskIndex).innerHTML = `
            <img class="member-pic" src="../img/contact.png">
            <div class="user-data">
            <span id="user-name" class="name-email">${allTasks[taskIndex].assignment[i].name}</span>
            <span class="email">${allTasks[taskIndex].assignment[i].email}
            </div>
        `;
    }
}



// Html for Popup
function generatePopUpContent(i) {
    return `
    <div class="close-btn-container">
    <button id="closeBtn" onclick="hideInfo(${i})" class="btn-close"><img src="../img/addtask/cross.svg"></button>
    </div>
    <label for="title">Title</label>
    <input type="text" id="title${i}" value="${inactiveTasks[i].title}">
    <label for="description">Description</label>
    <textarea name="description" id="description${i}" cols="30" rows="10">${inactiveTasks[i].description}</textarea>
    <label for="due date">Due Date</label>
    <input id="date${i}" type="date" value="${inactiveTasks[i].date}">
    <label for="prio">Prio</label>
    <select class="select-opitons" id="urgency${i}" required>
        <option hidden selected>${inactiveTasks[i].urgency}</option>
        <option>Low</option>
        <option>Middle</option>
        <option>High</option>
    </select>
    <label for="category">Category</label>
    <select id="id-category${i}"required>
    <option hidden selected>${inactiveTasks[i].category}</option>
    <option>Management</option>
    <option>Marketing</option>
    <option>Product</option>
    <option>Sale</option>
</select>
    <label for="Assigned">Assigned to</label>
    <span class="info-text">${inactiveTasks[i].assignment}</span>
    <div class="buttons">
        <button  onclick="updateUser(${i})" class="edit-btn">OK <img src="../img/addtask/arrow.svg"</button>
    </div>
</div>

    
`
}

// Html for Tasks
function generateTaskContentHTML(i) {
    return `
    <div class="history">
        <div class="members-list">
        <img class="member-pic" src="../img/contact.png">
        <span id="user-name" class="name-email">${inactiveTasks[i].assignment}
        </div>
        <div class="category">
            <b class="responsiv-category">Category:</b>
            <p class="category1">${inactiveTasks[i].category}</p>
        </div>
        <div class="details-history">
            <b class="responsiv-details">Details:</b>
            <span class="break">${inactiveTasks[i].description}</span>
        </div>
            <img src="../img/edit.png" class="edit-user" onclick="editUser(${i})"></button>
            <button id="showTaskinBoard" class="text-createTask" onclick="showTaskinBoard(${inactiveTasks[i].id})">+</button>
    </div>
`;
}
