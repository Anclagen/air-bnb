import { Router } from "./components/router/router.js";
import { Nav } from "./components/nav/nav.js";
import { SearchModal } from "./components/search/searchModal.js";
import { Theme } from "./components/theme/theme.js";
import { loginFormHandler } from "./components/handlers/login/loginForm.js";
import { registerFormHandler } from "./components/handlers/register/registerForm.js";
import { sessionHandler } from "./components/handlers/session/session.js";
import { logout } from "./components/handlers/logout/logout.js";
import { updateProfileFormHandler } from "./components/handlers/profile/updateProfile.js";

try {
  $("document").ready(function () {
    function Navigation() {
      Router();
      Nav();
    }
    // check if user is already logged in
    sessionHandler();
    // Router, navbar and theme setups
    Navigation();
    addEventListener("popstate", Navigation);
    Theme();
    // Modal handlers
    loginFormHandler();
    registerFormHandler();
    logout();
    updateProfileFormHandler();
    SearchModal();
  });
} catch (error) {
  console.error(error);
  alert("An error occurred, please try again later.");
}
