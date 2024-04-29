import { Home } from "../../pages/home/index.js";
import { Profile } from "../../pages/profile/index.js";
import { Venues } from "../../pages/venues/index.js";

export function Router() {
  const root = $("#root-main");
  // Render page
  switch (window.location.hash) {
    case "":
      return root.html(Home());
    case "#profile":
      return root.html(Profile());
    case "#venues":
      return root.html(Venues());
    default:
      return root.html(Home());
  }
}
