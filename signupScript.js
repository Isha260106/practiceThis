document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting by default

    // Collect values
    const userName = document.getElementById("username").value.trim();
    const passWord = document.getElementById("password").value;
    const email = document.getElementById("email").value.trim();
    const Name = document.getElementById("Name").value.trim();
    const confirmPassword = document.getElementById("Confirmpassword").value;
    const accNo = document.getElementById("acNo").value.trim();
    const bankName = document.getElementById("bankName").value.trim();
    const bal = document.getElementById("balance").value.trim();
    const ifsc = document.getElementById("ifscCode").value.trim();
    const panNo = document.getElementById("panNo").value.trim();

    // Regex patterns
    const usernameRegex = /^[a-zA-Z0-9]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    const nameRegex = /^[a-zA-Z]{2,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const accNoRegex = /^\d{9,18}$/;
    const bankNameRegex = /^[A-Za-z&.\s]{3,50}$/;
    const panNoRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const balRegex = /^\d+(\.\d{1,2})?$/;

    // Clear all previous error messages
    const errorIds = [
        "NameError", "userNameError", "passwordError", "ConfirmpasswordError", "EmailError",
        "PANnumError", "ACnumError", "bankNameError", "balanceError", "IFSCCodeError"
    ];
    errorIds.forEach(id => document.getElementById(id).innerText = "");

    let isValid = true;

    // Validation checks
    if (!usernameRegex.test(userName)) {
        document.getElementById("userNameError").innerText = "Enter valid username !!";
        isValid = false;
    }
    if (!passwordRegex.test(passWord)) {
        document.getElementById("passwordError").innerText = "Enter valid password !!";
        isValid = false;
    }
    if (!nameRegex.test(Name)) {
        document.getElementById("NameError").innerText = "Enter valid Name !!";
        isValid = false;
    }
    if (!emailRegex.test(email)) {
        document.getElementById("EmailError").innerText = "Enter valid Email !!";
        isValid = false;
    }
    if (confirmPassword !== passWord) {
        document.getElementById("ConfirmpasswordError").innerText = "Passwords don't match !!";
        isValid = false;
    }
    if (!panNoRegex.test(panNo)) {
        document.getElementById("PANnumError").innerText = "Enter valid PAN Number !!";
        isValid = false;
    }
    if (!accNoRegex.test(accNo)) {
        document.getElementById("ACnumError").innerText = "Enter valid Account Number !!";
        isValid = false;
    }
    if (!bankNameRegex.test(bankName)) {
        document.getElementById("bankNameError").innerText = "Enter valid Bank Name !!";
        isValid = false;
    }
    if (!(balRegex.test(bal) && parseFloat(bal) > 0)) {
        document.getElementById("balanceError").innerText = "Enter valid Balance !!";
        isValid = false;
    }
    if (!ifscRegex.test(ifsc)) {
        document.getElementById("IFSCCodeError").innerText = "Enter valid IFSC Code !!";
        isValid = false;
    }

   
    if (isValid) {
        alert("User Signed Up Successfully!");
        window.localStorage.setItem(userName,passWord);
        window.localStorage.setItem("Balance",bal);
        window.location.href ="index.html"; 
    }
});
