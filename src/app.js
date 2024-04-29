import { Router } from "./components/router/router.js";
import { Nav } from "./components/nav/nav.js";
import { Theme } from "./components/theme/theme.js";

$("document").ready(function () {
  function Navigation() {
    Router();
    Nav();
  }

  Navigation();
  Theme();
  addEventListener("popstate", Navigation);
});
