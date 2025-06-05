
document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const userName = document.getElementById("username").value;
    const passWord = document.getElementById("password").value;

    const usernameRegex = /^[a-zA-Z0-9]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

    const displayErrorInName = document.getElementById("userNameError");
    const displayErrorInPassword = document.getElementById("passwordError");

    let isValid = true;

    displayErrorInName.innerText = "";
    displayErrorInPassword.innerText = "";

    if (!usernameRegex.test(userName)) {
        displayErrorInName.innerText = "Enter valid username !!";
        isValid = false;
    }

    if (!(passwordRegex.test(passWord) && passWord === window.localStorage.getItem(userName))) {
        displayErrorInPassword.innerText = "Enter valid password !!";
        isValid = false;
    }

    if (isValid) {
        
        window.localStorage.setItem("isLoggedIn", "true");
        window.localStorage.setItem("loggedInUser", userName);
        alert("User Logged In");
        window.location.href = "portfolio.html";
    }
});
