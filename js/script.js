let allTasks = []; //addtask.js, createTask()
let allSignedUser = [];
let allTicketPositions = [];

setURL('https://buenyamin-altan.developerakademie.com/smallest_backend_ever');

/**
 * Saves array "allTasks" to backend
 */
async function saveToBackendTasks() {
    await backend.setItem('allTasks', JSON.stringify(allTasks));
}

/**
 * Saves array "allSignedUser" to backend
 */
async function saveToBackendSignUps(users) {
    await backend.setItem('allSignedUser', JSON.stringify(users));
}


/**
 * Saves ticket position to backend
 */
async function saveToBackendTicketPosition() {
    await backend.setItem('ticketPosition', JSON.stringify(allTicketPositions));
}

/**
 * Load array "allTasks" from backend
 */
function loadAllTasks() {
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
}

/**
 * Loads array "allSignedUser" from backend
 */
function loadAllSignIns() {
    allSignedUser = JSON.parse(backend.getItem('allSignedUser')) || [];
}