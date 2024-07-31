import { loginFormHandler } from "./login/loginForm.js";
import { registerFormHandler } from "./register/registerForm.js";
import { sessionHandler } from "./session/session.js";
import { logout } from "./logout/logout.js";
import { updateProfileFormHandler } from "./profile/updateProfile.js";
import { createVenueFormHandler } from "./venue/createVenue.js";

export function handlers() {
  sessionHandler();
  loginFormHandler();
  registerFormHandler();
  sessionHandler();
  logout();
  updateProfileFormHandler();
  createVenueFormHandler();
}
