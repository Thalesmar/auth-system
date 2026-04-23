const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const warningMsg = document.getElementById("warningMsg");
const submitBtn = document.querySelector(".form-btn");
const form = document.querySelector(".form-box");

const handleInputForm = async (e) => {
    e.preventDefault();

    const usernameInputValue = usernameInput.value.trim();
    const passwordInputValue = passwordInput.value.trim();

    if (!usernameInputValue || !passwordInputValue) {
        warningMsg.textContent = 'All fields required!';

        setTimeout(() => {
            warningMsg.textContent = "";
        }, 7000);
        return;
    }

    const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
            username: usernameInputValue,
            password: passwordInputValue,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        warningMsg.textContent = data.message;
        return;
    }

    warningMsg.textContent = data.message;

}

form.addEventListener("submit", handleInputForm);
