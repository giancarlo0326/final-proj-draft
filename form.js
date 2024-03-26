function validateForm(event) {
    event.preventDefault(); // Prevents default form submission

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = "";

    // Email validation
    var emailRegex = /^[a-zA-Z][a-zA-Z0-9]{4,10}@[a-zA-Z]+\.(com)$/;
    if (!emailRegex.test(email)) {
        errorMessage.innerHTML += "Invalid email format. ";
    }

    // Password validation
    var passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+]{6,12}$/;
    if (!passwordRegex.test(password)) {
        errorMessage.innerHTML += "Invalid password format.";
    }

    // If validation passes, submit the form
    if (errorMessage.innerHTML === "") {
        document.getElementById("loginForm").submit();
    }
}
