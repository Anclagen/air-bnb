function loginForm() {}
function registerForm() {}

export function Auth() {
  //get state from url
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.slice(hash.indexOf("?") + 1));
  const state = params.get("state") === "register" ? "register" : "login";
  console.log(state);

  if (state === "register") {
    return registerForm();
  } else {
    return loginForm();
  }
}
