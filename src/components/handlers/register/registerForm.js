import { register } from "../../api/register.js";
import { login } from "../../api/login.js";
import { setSession } from "../session/session.js";

export function registerFormHandler() {
  const registerForm = $("#registerForm");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = $("#registerName").val();
    const email = $("#registerEmail").val();
    const password = $("#registerPassword").val();

    const response = await register(name, email, password);

    if (response.ok) {
      setSession(response.data);
    } else {
      console.log("Error:" + response.error.status);
    }
  });
}
