import { Router } from "./components/router/router.js";
import { Nav } from "./components/nav/nav.js";
import { SearchModal } from "./components/search/searchModal.js";
import { Theme } from "./components/theme/theme.js";

$("document").ready(function () {
  function Navigation() {
    Router();
    Nav();
  }
  Navigation();
  SearchModal();
  Theme();
  addEventListener("popstate", Navigation);
});
