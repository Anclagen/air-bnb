import { login } from "../../api/auth/login.js";
import { setSession } from "../session/session.js";
import { validateForm } from "../../form/validation/validateForm.js";
import { validateNoroffEmail } from "../../form/validation/validateNoroffEmail.js";
import { errorFeedback } from "../../form/feedback/errorFeedback.js";

export async function loginFormHandler() {
  try {
    const loginForm = $("#loginForm");

    loginForm.on("submit", async (event) => {
      event.preventDefault();

      const isValid = validateForm([
        {
          id: "loginEmail",
          feedbackId: "loginEmailFeedback",
          validate: validateNoroffEmail,
          errorMessage: "Invalid email. Please use your @stud.noroff.no email.",
        },
        {
          id: "loginPassword",
          feedbackId: "loginPasswordFeedback",
          validate: (password) => password.length >= 8,
          errorMessage: "Password must be at least 8 characters long.",
        },
      ]);

      if (!isValid) {
        return;
      }

      const email = $("#loginEmail").val();
      const password = $("#loginPassword").val();
      const response = await login(email, password);

      if (response.error) {
        $("#loginFormError").html(errorFeedback(response.error[0].message));
        return;
      }

      setSession(response.data);
      $("#loginModal").modal("hide");
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
