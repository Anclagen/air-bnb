import { Home } from "../../pages/home/index.js";
import { Profile } from "../../pages/profile/index.js";
import { Map } from "../../pages/map/index.js";
import { Auth } from "../../pages/auth/index.js";
import { loadMap } from "../map/venueMap.js";

export function Router() {
  const root = $("#root-main");
  // Render page
  switch (window.location.hash) {
    case "":
      root.html(Home());
      return;
    case "#profile":
      root.html(Profile());
      return;
    case "#map":
      root.html(Map());
      loadMap();
      return;
    case "#auth":
    case "#auth?state=login":
    case "#auth?state=register":
      root.html(Auth());
      return;
    default:
      console.log("default");
      root.html(Home());
      return;
  }
}
