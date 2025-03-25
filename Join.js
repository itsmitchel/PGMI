document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields before submitting.");
    } else {
        // Save user data to the backend
        try {
            await fetch("http://localhost:3000/save-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message })
            });

            // Display decorative confirmation message
            const confirmationMessage = document.createElement("div");
            confirmationMessage.style.position = "fixed";
            confirmationMessage.style.top = "50%";
            confirmationMessage.style.left = "50%";
            confirmationMessage.style.transform = "translate(-50%, -50%)";
            confirmationMessage.style.backgroundColor = "#fff";
            confirmationMessage.style.color = "#333";
            confirmationMessage.style.padding = "20px";
            confirmationMessage.style.borderRadius = "10px";
            confirmationMessage.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
            confirmationMessage.style.textAlign = "center";
            confirmationMessage.innerHTML = `
                <h2>Thank You for Joining Us!</h2>
                <p>We will send you an email as a confirmation.</p>
                <p>Redirecting to the home page...</p>
            `;
            document.body.appendChild(confirmationMessage);

            // Redirect to the home page after 3 seconds
            setTimeout(() => {
                window.location.href = "PGMI.HTML";
            }, 3000);
        } catch (error) {
            alert("An error occurred while submitting your information. Please try again.");
        }
    }
});