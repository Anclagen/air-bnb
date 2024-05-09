import { Home } from "../../pages/home/index.js";
import { Profile } from "../../pages/profile/index.js";
import { Map } from "../../pages/map/index.js";

export function Router() {
  // Clear the root-main element using jQuery empty method as it removes all event handlers and DOM elements
  $("#root-main").off().empty();
  switch (window.location.hash) {
    case "":
      Home();
      return;
    case "#profile":
      Profile();
      return;
    case "#map":
      Map();
      return;
    default:
      Home();
      return;
  }
}
