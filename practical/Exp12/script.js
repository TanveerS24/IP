// Experiment 12: InsureEasy
// Demo login data is loaded from users.json.

const loginForm = document.getElementById("loginForm");
const loginPanel = document.getElementById("loginPanel");
const dashboard = document.getElementById("dashboard");
const loginMessage = document.getElementById("loginMessage");
const welcome = document.getElementById("welcome");
const optionList = document.getElementById("optionList");
const searchInput = document.getElementById("searchInput");
const detailsForm = document.getElementById("detailsForm");
const formMessage = document.getElementById("formMessage");
const submissionList = document.getElementById("submissionList");

let options = [];

// Read user and sample option data from the JSON file.
fetch("users.json")
    .then(response => response.json())
    .then(data => {
        window.demoUsers = data.users;
        options = data.options;
        displayOptions(options);
    })
    .catch(() => {
        loginMessage.textContent = "Could not load users.json. Run this folder using Live Server.";
    });

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = (window.demoUsers || []).find(item =>
        item.username === username && item.password === password
    );

    if (user) {
        loginPanel.classList.add("hidden");
        dashboard.classList.remove("hidden");
        welcome.textContent = "Logged in as " + user.username + " (" + user.role + ")";
        displaySubmissions();
    } else {
        loginMessage.textContent = "Invalid username or password.";
    }
});

function displayOptions(items) {
    optionList.innerHTML = "";

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "option-card";
        card.innerHTML = "<h4>" + item.name + "</h4><p>" + item.description + "</p>";
        optionList.appendChild(card);
    });
}

searchInput.addEventListener("input", function() {
    const word = searchInput.value.toLowerCase();
    const filtered = options.filter(item => item.name.toLowerCase().includes(word));
    displayOptions(filtered);
});

detailsForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(detailsForm);
    const entry = {};
    formData.forEach((value, key) => entry[key] = value);

    const saved = JSON.parse(localStorage.getItem("exp12Submissions") || "[]");
    saved.push(entry);
    localStorage.setItem("exp12Submissions", JSON.stringify(saved));

    formMessage.textContent = "Details submitted successfully!";
    detailsForm.reset();
    displaySubmissions();
});

function displaySubmissions() {
    const saved = JSON.parse(localStorage.getItem("exp12Submissions") || "[]");
    submissionList.innerHTML = "";

    saved.slice().reverse().forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = Object.values(entry).join(" - ");
        submissionList.appendChild(li);
    });
}

document.getElementById("logoutButton").addEventListener("click", function() {
    dashboard.classList.add("hidden");
    loginPanel.classList.remove("hidden");
    loginForm.reset();
    loginMessage.textContent = "";
});
