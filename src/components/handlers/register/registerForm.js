import { register } from "../../api/register.js";
import { login } from "../../api/login.js";
import { setSession } from "../session/session.js";
import { validateForm } from "../../form/validation/validateForm.js";
import { validateNoroffEmail } from "../../form/validation/validateNoroffEmail.js";
import { errorFeedback } from "../../form/feedback/errorFeedback.js";

export async function registerFormHandler() {
  try {
    const registerForm = $("#registerForm");

    registerForm.on("submit", async (event) => {
      event.preventDefault();
      const name = $("#registerName").val();
      const email = $("#registerEmail").val();
      const password = $("#registerPassword").val();

      function validateName(name) {
        return /^[a-zA-Z0-9_]+$/.test(name);
      }

      const isValid = validateForm([
        {
          id: "registerName",
          feedbackId: "registerNameFeedback",
          validate: validateName,
          errorMessage: "Name must be at least 2 characters long.",
        },
        {
          id: "registerEmail",
          feedbackId: "registerEmailFeedback",
          validate: validateNoroffEmail,
          errorMessage: "Invalid email.",
        },
        {
          id: "registerPassword",
          feedbackId: "registerPasswordFeedback",
          validate: (password) => password.length >= 8,
          errorMessage: "Password must be at least 8 characters long.",
        },
        {
          id: "registerConfirmPassword",
          feedbackId: "registerConfirmPasswordFeedback",
          validate: (confirmPassword) => confirmPassword === $("#registerPassword").val(),
          errorMessage: "Passwords do not match.",
        },
      ]);

      if (!isValid) {
        return;
      }

      const response = await register(name, email, password);

      if (response.error) {
        $("#registerFormError").html(errorFeedback(response.error[0].message));
        return;
      }

      const loginResponse = await login(email, password);

      if (loginResponse.error) {
        $("#registerFormError").html(errorFeedback(loginResponse.error[0].message));
        return;
      }

      setSession(loginResponse.data);
      $("#registerModal").modal("hide");
      window.location.hash = "profile";
      registerForm.trigger("reset");
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
