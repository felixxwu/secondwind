var usernameLabel = "secondwind-username";
var passwordLabel = "secondwind-password";
var IDLabel = "secondwind-id";

function clearLoginDetails() {
    localStorage.removeItem(usernameLabel);
    localStorage.removeItem(passwordLabel);
}

function logout() {
    clearLoginDetails();
    window.location.reload();
}

function saveUsername(username) {
    localStorage.setItem(usernameLabel, username);
}

function savePassword(password) {
    localStorage.setItem(passwordLabel, password);
}

function getUsername() {
    return localStorage.getItem(usernameLabel);
}

function getPassword() {
    return localStorage.getItem(passwordLabel);
}