import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "leaflet/dist/leaflet.css";
import "./styles/index.scss";
import { Router } from "./components/router/router.js";
import { Nav } from "./components/nav/nav.js";
import { Theme } from "./components/theme/theme.js";
import { handlers } from "./components/handlers/index.js";

try {
  $("document").ready(function () {
    function Navigation() {
      Router();
      Nav();
    }
    // Modal handlers
    handlers();
    // Router, navbar and theme setups
    Navigation();
    addEventListener("popstate", Navigation);
    Theme();
  });
} catch (error) {
  console.error(error);
  alert("An error occurred, please try again later.");
}
