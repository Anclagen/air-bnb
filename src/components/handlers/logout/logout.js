import { removeSession } from "../session/session.js";
import $ from "jquery";

export function logout() {
  $("#logoutBtn").on("click", removeSession);
}
