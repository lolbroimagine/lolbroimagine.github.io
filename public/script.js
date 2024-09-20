var loginForm = document.getElementById("login");
var registerForm = document.getElementById("register");
var btn = document.getElementById("btn");

window.onload = function() {
    // Set initial position of the button when the page loads
    btn.style.left = "0";
};

function register() {
    loginForm.style.left = "-100%";
    registerForm.style.left = "0";
    btn.style.left = "54%"; // Move button to 54% for register

    // Force reflow to ensure transition applies correctly
    void btn.offsetWidth;
}

function login() {
    loginForm.style.left = "0";
    registerForm.style.left = "100%";
    btn.style.left = "0"; // Move button to 0% for login

    // Force reflow to ensure transition applies correctly
    void btn.offsetWidth;
}