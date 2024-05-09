import { getProfile } from "../../components/api/profile/get.js";
import { getSession } from "../../components/handlers/session/session.js";
import { venueCard } from "../../components/cards/venueCard.js";
import { venueLoadingCard } from "../../components/cards/venueLoadingCard.js";

export async function Profile() {
  if ($("body[data-session=false]").length > 0) {
    // go to home page if false, using hash route
    $("document").ready(function () {
      window.location.hash = "#";
    });
    return;
  }
  const session = getSession();
  //TODO add an id check later to get other users profile
  const { data, meta } = await getProfile(session.name);
  const user = data;
  const root = $("#root-main");
  const content = `
    <div class="">
      <img class="object-fit-cover w-100" style="height: 200px;" id="userBanner" src="${user.banner.url}" alt="${user.banner.alt}" />
    </div>
    <section class="container-lg">
      <h1 class="text-center">${user.name}'s Profile</h1>
      <div class="container">
        <div class="row">
          <div class="col-md-4 text-center">
            <img class="object-fit-contain w-100 rounded shadow" id="userAvatar" src="${user.avatar.url}" alt="${user.avatar.alt}" />
            <button class="btn btn-primary me-3 my-3" data-bs-toggle="modal" data-bs-target="#profileUpdateModal">Update Profile</button>
            <button class="btn btn-primary my-3" data-bs-toggle="modal" data-bs-target="#profileDeleteModal1">Delete Profile</button>
          </div>
          <div class="col-md-8 px-4">
            <h2>${user.name}</h2>
            <p>Contact Details: <a href="mailto:${user.email}">${user.email}</a></p>
            <h3>A Little About Me!</h3>
            <p id="userBio">${user.bio}</p>
            <h3>Stats</h3>
            <p>Bookings: ${user.bookings.length}</p>
            <p>Venues: ${user.venues.length}</p>

          </div>
        </div>
      </div>
    </section>
    <section class="container-lg ${session.name === user.name ? "" : "hidden"}">
    <h2>Bookings</h2>
    <div class="row" id="bookings">
    ${Array(4).fill(venueLoadingCard().prop("outerHTML")).join("")}

    </div>
    </section>
    <section class="container-lg">
    <h2>Venues</h2>
    <div class="row" id="venues">
    ${Array(4).fill(venueLoadingCard().prop("outerHTML")).join("")}
    </div>
    </section>`;

  root.html(content);

  if (meta.error) {
    console.log(meta.error);
    return;
  }
  const bookings = $("#bookings");
  const venues = $("#venues");

  bookings.html("");
  venues.html("");

  data.bookings.forEach((booking) => {
    bookings.append(venueCard(booking.venue));
  });

  data.venues.forEach((venue) => {
    venues.append(venueCard(venue));
  });
}
