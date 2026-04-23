const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const warningMsg = document.getElementById("warningMsg");
const emailInput = document.getElementById("email");
const submitBtn = document.querySelector(".form-btn");
const termsInput = document.getElementById("termsInput");
const form = document.querySelector(".form-box");

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
        const response = await fetch("http://localhost:8000/api/signup", {
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
    } catch (error) {
        warningMsg.textContent = "Server error. Please try again.";
        console.log(error);
        console.log(object);
    }
};

form.addEventListener("submit", handleInputForm);
