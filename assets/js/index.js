
const themeSwitch = document.querySelector("#themeSwitch");
themeSwitch.addEventListener("change", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
});


var app = $.spapp({
    defaultView: "#home",
    templateDir: "./views/"
});

app.route({
    view: "home",
    load: "home.html",
    onCreate: function () {},
    onReady: function () {}
});


app.run();


const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
if (isLoggedIn) {
    document.getElementById("logoutButton").style.display = "block";
}

document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    document.getElementById("logoutButton").style.display = "none";
    window.location.href = "#login"; 
});


window.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("username");

    if (isLoggedIn === "true" && username) {
        const welcomePopup = document.getElementById("welcomePopup");
        const welcomeText = document.getElementById("welcomeText");
        welcomeText.textContent = `Hello, ${username}! Welcome back!`;

        welcomePopup.style.display = "block"; 

       
        setTimeout(() => {
            welcomePopup.style.display = "none";
        }, 2000);
    }
});


document.querySelector('#login').addEventListener('submit', async function (event) {
    event.preventDefault();

    var username = document.querySelector('input[name="username"]').value;
    var password = document.querySelector('input[name="password"]').value;

    if (username && password) {
        const isAuthenticated = await authenticateUser(username, password);
        if (isAuthenticated) {
            
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);

           
            const welcomePopup = document.getElementById("welcomePopup");
            const welcomeText = document.getElementById("welcomeText");
            welcomeText.textContent = `Hello, ${username}! Welcome back!`;
            welcomePopup.style.display = "block";

       
            setTimeout(() => {
                welcomePopup.style.display = "none";
                window.location.hash = "#home"; 
            }, 2000);
        } else {
            
            var errorModal = new bootstrap.Modal(document.getElementById('login-errorModal'));
            errorModal.show();
        }
    } else {
        
        var errorModal = new bootstrap.Modal(document.getElementById('login-errorModal'));
        errorModal.show();
    }
});


async function authenticateUser(username, password) {
    try {
        const response = await fetch('assets/data/users.json'); 
        const users = await response.json();

       
        return users.some(user => user.username === username && user.password === password);
    } catch (error) {
        console.error('Error loading users:', error);
        return false;
    }
}

function protectRoute() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
        window.location.href = "#login"; 
    }
}



function toggleSignupPasswordVisibility() {
    const passwordField = document.getElementById("signup-password");
    const passwordVisibilityIcon = document.querySelector(".signup-show-password");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        passwordVisibilityIcon.textContent = "🙈"; 
    } else {
        passwordField.type = "password";
        passwordVisibilityIcon.textContent = "👁️"; 
    }
}


document.getElementById('signup-password').addEventListener('input', function () {
    const password = this.value;
    const strengthElement = document.getElementById('signup-passwordStrength');
    let strength = "Weak";

    if (password.length > 8) {
        strength = "Medium";
        if (/[A-Z]/.test(password) && /\d/.test(password)) {
            strength = "Strong";
        }
    }

    strengthElement.textContent = strength;
});

