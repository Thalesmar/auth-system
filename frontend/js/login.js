const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const warningMsg = document.getElementById("warningMsg");
const form = document.querySelector(".form-box");
const togglePasswordButton = document.querySelector(".eye-icon");


const togglePasswordVisibility = () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
};

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

    try {
        const response = await fetch('http://localhost:8000/api/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
    } catch (error) {
        warningMsg.textContent = "Unable to reach the API. Start the backend or configure AUTH_API_BASE_URL.";
        console.log(error);
    }

};

form.addEventListener("submit", handleInputForm);
togglePasswordButton?.addEventListener("click", togglePasswordVisibility);
