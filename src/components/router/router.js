import { Home } from "../../pages/home/index.js";
import { Profile } from "../../pages/profile/index.js";
import { Map } from "../../pages/map/index.js";

export function Router() {
  // Render page
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
      console.log("default");
      Home();
      return;
  }
}
