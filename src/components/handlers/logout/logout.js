import { removeSession } from "../session/session.js";

export function logout() {
  $("#logoutBtn").on("click", removeSession);
}
