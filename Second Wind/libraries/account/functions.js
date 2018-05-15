var usernameLabel = "secondwind-username";
var passwordLabel = "secondwind-password";

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