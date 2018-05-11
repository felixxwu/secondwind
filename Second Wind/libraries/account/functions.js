function clearLoginDetails() {
    localStorage.removeItem(usernameLabel);
    localStorage.removeItem(passwordlabel);
}

function logout() {
    clearLoginDetails();
    window.location.reload();
}