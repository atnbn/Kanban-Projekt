async function init() {
    await downloadFromServer(); // necessary to use "signedUser"
    loadAllSignIns(); // necessary to use "signedUser"
}

/**
 * Replaces the login formular with the sign in formular 
 */
function signIn() {
    document.getElementById('id-formLogin').classList.add('d-none');
    document.getElementById('id-formSignIn').classList.remove('d-none');
}

/**
 * Replaces the sign in formular with the login formular 
 */
function backToLogin() {
    document.getElementById('id-formLogin').classList.remove('d-none');
    document.getElementById('id-formSignIn').classList.add('d-none');
}

/**
 * Checks if account data exists in array "allSignedUser", if yes leads to board.html and if no it shows an alert 
 */
async function login() {

    let email = document.getElementById('id-email').value;
    let password = document.getElementById('id-password').value;
    let found = allSignedUser.find(u => u.email === email && u.password === password);

    if (found) {
        window.location.href = "./board.html";
    } else {
        alert('Email or password is wrong')
    }
}

/**
 * Pushes the account data to array "allSignedUser", saves into backend and leads to board.html
 */
async function signInBackend() {
    debugger
    let name = document.getElementById('id-name').value;
    let email = document.getElementById('id-email1').value;
    let password = document.getElementById('id-password1').value;

    let signedUser = {
        'img': 'img/contact.png',
        'name': name,
        'email': email,
        'password': password
        // 'img' : img
    }

    allSignedUser.push(signedUser);
    await saveToBackendSignUps(allSignedUser);
    window.location.href = "./board.html";
}