import $ from "jquery";

//use jquery
export function sessionHandler() {
  // Check if the user is logged in previously by checking local for a user session object
  const session = getSession();
  const body = $("body");
  if (session) {
    if (session.accessToken && session.apiKey) {
      body.attr("data-session", true);
    } else {
      body.attr("data-session", false);
    }
  }
  // window.addEventListener("storage", (event) => {
  //   console.log(event);
  // });

  //jquery event listener for local storage session change
  $(window).on("storage", function (e) {
    if (e.originalEvent.key === "session") {
      if (e.originalEvent.newValue) {
        body.attr("data-session", true);
      } else {
        body.attr("data-session", false);
      }
    }
  });

  //jquery event listener for session change in current window
  $(window).on("session", function (e) {
    const user = getSession();
    if (user?.accessToken && user?.apiKey) {
      body.attr("data-session", true);
    } else {
      body.attr("data-session", false);
    }
  });
}

// get the session from local storage
export function getSession() {
  return JSON.parse(localStorage.getItem("session"));
}

// set the session in local storage
export function setSession(session) {
  localStorage.setItem("session", JSON.stringify(session));
  window.dispatchEvent(new Event("session"));
}

// remove the session from local storage
export function removeSession() {
  localStorage.removeItem("session");
  window.dispatchEvent(new Event("session"));
}
