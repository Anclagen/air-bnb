export function Profile() {
  console.log($("body[data-session=false]"));
  if ($("body[data-session=false]").length > 0) {
    // go to home page if false, using hash route
    $("document").ready(function () {
      window.location.hash = "#";
    });
    return;
  }

  const root = $("#root-main");
  const content = `<div>
      <h1>Profile</h1>
      <button data-bs-toggle="modal" data-bs-target="#profileUpdateModal">Update Profile</button>
      <button data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
    </div>`;

  root.html(content);
}
