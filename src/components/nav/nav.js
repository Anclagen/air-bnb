export function Nav() {
  const nav = $(".nav-link");
  nav.removeClass("active");
  const hash = window.location.hash ? window.location.hash : "#";
  nav.filter(`[href="${hash}"]`).addClass("active");
}
