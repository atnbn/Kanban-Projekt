let selectedMembers = [];
let color;
async function init() {
    includeHTML();
    await downloadFromServer();
    loadAllSignIns(); /* has to load before assignToMembers() */
    loadAllTasks(); // all have to load again so that new can add up
    assignToMembers();
    setTimeout(() => { checkUrlShowOnNav(); }, 500)
    showCategorys()
}


/**
 * Deletes user from array "allSignedUser", saves the backend adjustment and loads assignToMembers() to show changes
 * @param {number} i - Which one was selected
 */
function deleteUser(i) {
    allSignedUser.splice(i, 1);
    saveToBackendSignUps();
    assignToMembers();
}
/**
 * Alters the array "selectedMembers" and replaces the plus with a minus by selection
 * @param {number} i - filters which user was selected
 */
async function createTask() {
    gatherInputFields();
    await saveToBackendTasks();
    deleteInformation();
    addAlert();
}

/* 
*Gathers all infos from input and creates  a Task 
*/

const btns = document.querySelectorAll('.dot')

for (let i = 0; i < btns.length; i++) {
    const element = btns[i];
    element.addEventListener('click', function () {
        color = ''
        color = element.value
        console.log(color);
    })
}

function gatherInputFields() {
    let title = document.getElementById('id-title').value;
    let date = document.getElementById('id-date').value;
    let category = document.getElementById('id-category').value;
    let urgency = document.getElementById('id-urgency').value;
    // const categorycolor = checkColor(color);
    let description = document.getElementById('id-description').value;
    let assignment = document.getElementById('id-assignment').value;
    let task = {
        'title': title,
        'date': date,
        'category': category,
        'urgency': urgency,
        'description': description,
        'assignment': assignment,
        'board': 'todo', //board bc category already used
        'id': new Date().getTime(),
        'status': 'inactiv'
    };
    allTasks.push(task);
}

/**
 * Clears all input fields and load assignToMembers to show changes
 */
function deleteInformation() {
    document.getElementById('id-title').value = '';
    document.getElementById('id-date').value = '';
    document.getElementById('id-category').value = '';
    document.getElementById('id-urgency').value = '';
    document.getElementById('id-description').value = '';
    selectedMembers = []; //array gets cleared for new ticket
    assignToMembers();
}

function showTaskinBoard() {
    document.getElementById('showTaskinBoard').classList.add('display:flex')
}

function clearTask() {
    document.getElementById('id-title').value = '';
    document.getElementById('id-date').value = '';
    document.getElementById('id-category').value = '';
    document.getElementById('id-urgency').value = '';
    document.getElementById('id-description').value = '';
}

function assignToMembers() {
    document.getElementById('id-assignment').innerHTML = ""; //necessary otherwise too much gets added
    for (let i = 0; i < allSignedUser.length; i++) {
        let member = allSignedUser[i];
        document.getElementById('id-assignment').innerHTML += `
                <option id="member(${i})">${member.name}</option>

        `;
    }
}

function addAlert() {
    document.getElementById('alert').classList.remove('d-none');


}

const select = document.getElementById('id-category');
const option = document.getElementById('new-category');
const create = document.getElementById('createCategory');
const createContainer = document.getElementById('createContainer')


// select.addEventListener('change', function (event) {
//     if (event.target.value === 'addcategory') {
//         select.classList.add('d-none')
//         createContainer.classList.remove('d-none')
//     }
// })


let categorys = ['Sales', 'Marketing', 'Development', 'Support']


function showCategorys() {

    for (let i = 0; i < categorys.length; i++) {
        let category = categorys[i];
        select.innerHTML += `
        <option value="${category}">${category}</option>
            `
    }
}



