function register() {
    const user = document.getElementById("regUser").value;
    const pass = document.getElementById("regPass").value;

    if (user === "" || pass === "") {
        alert("Fill all fields");
        return;
    }

    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    alert("Registration successful!");
    window.location.href = "index.html";
}
function login() {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    if (
        user === localStorage.getItem("username") &&
        pass === localStorage.getItem("password")
    ) {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials");
    }
}
function logout() {
    window.location.href = "index.html";
}
