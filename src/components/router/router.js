import { Home } from "../../pages/home/index.js";
import { Profile } from "../../pages/profile/index.js";
import { Venues } from "../../pages/venues/index.js";
import { loadMap } from "../map/venueMap.js";

export function Router() {
  const root = $("#root-main");
  // Render page
  switch (window.location.hash) {
    case "":
      return root.html(Home());
    case "#profile":
      root.html(Profile());
      loadMap();
      return;
    case "#venues":
      return root.html(Venues());
    default:
      return root.html(Home());
  }
}
