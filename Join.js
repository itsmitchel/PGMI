document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || password === "" || message === "") {
        alert("Please fill in all fields before submitting.");
    } else {
        try {
            const response = await fetch("http://localhost:3000/save-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, message })
            });

            if (response.ok) {
                alert("Registration successful! Redirecting to the home page...");
                window.location.href = "PGMI.HTML";
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred while submitting your information. Please try again.");
        }
    }
});
function togglePasswordVisibility(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}