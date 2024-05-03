import { login } from "../../api/login.js";
import { setSession } from "../session/session.js";

export function loginFormHandler() {
  const loginForm = $("#loginForm");

  loginForm.on("submit", async (event) => {
    event.preventDefault();

    const email = $("#loginEmail").val();
    const password = $("#loginPassword").val();

    const response = await login(email, password);

    if (response.error) {
      console.log("Error:" + response.error.status);
      return;
    }

    setSession(response.data);
    $("#loginModal").modal("hide");
  });
}
