var usernameLabel = "secondwind-username";
var passwordlabel = "secondwind-password";

function clearLoginDetails() {
    localStorage.removeItem(usernameLabel);
    localStorage.removeItem(passwordlabel);
}

function logout() {
    clearLoginDetails();
    window.location.reload();
}