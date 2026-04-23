const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const warningMsg = document.getElementById("warningMsg");
const emailInput = document.getElementById("email");
const termsInput = document.getElementById("termsInput");
const form = document.querySelector(".form-box");
const togglePasswordButton = document.querySelector(".eye-icon");
const API_BASE_URL = window.AUTH_API_BASE_URL || "http://localhost:8080";

const buildApiUrl = (path) => `${API_BASE_URL}${path}`;

const togglePasswordVisibility = () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
};

const handleInputForm = async (e) => {
    e.preventDefault();

    const usernameInputValue = usernameInput.value.trim();
    const passwordInputValue = passwordInput.value.trim();
    const emailInputValue = emailInput.value.trim();
    const termsBoxIsChecked = termsInput.checked;

    if (!usernameInputValue ||
        !passwordInputValue ||
        !emailInputValue ||
        !termsBoxIsChecked
    ) {
        warningMsg.textContent = "All fields required!";

        setTimeout(() => {
            warningMsg.textContent = "";
        }, 7000);
        return;
    }

    try {
        const response = await fetch(buildApiUrl("/api/signup"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: usernameInputValue,
                email: emailInputValue,
                password: passwordInputValue,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            warningMsg.textContent = data.message;
            return;
        }

        warningMsg.textContent = data.message;
        form.reset();
    } catch (error) {
        warningMsg.textContent = "Unable to reach the API. Start the backend or configure AUTH_API_BASE_URL.";
        console.log(error);
    }
};

form.addEventListener("submit", handleInputForm);
togglePasswordButton?.addEventListener("click", togglePasswordVisibility);
