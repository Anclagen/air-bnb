import { updateVenueModal } from "../templates/modals/venueModal.js";
import { getSession } from "../handlers/session/session.js";
import { deleteVenue } from "../api/venue/delete.js";
import { Router } from "../router/router.js";
import $ from "jquery";
import { wifi, noWifi, parking, noParking, food, noFood, pet, noPet } from "../../icons/index.js";

export function venueCard(venue) {
  const user = getSession();
  const $venueCard = $(`
  <div class="col-sm-6 col-md-4 col-xl-3 d-flex align-items-stretch">
  <div class="card m-2 w-100">
    ${venue.media[0] ? `<img src="${venue.media[0].url}" class="card-img-top" alt="${venue.name}" />` : ""}
    <div class="card-body">
      <h5 class="card-title">${venue.name}</h5>
      <p class="card-text">${venue.description}</p>
      <p class="card-text">Max Guests: ${venue.maxGuests}</p>
      <p class="card-text">Location: ${venue.location.city}, ${venue.location.country}</p>
      <p> ${venue.meta.wifi ? wifi : noWifi} ${venue.meta.parking ? parking : noParking} ${venue.meta.breakfast ? food : noFood} ${venue.meta.pets ? pet : noPet}</p>
      <button class="btn btn-primary p-2 px-3 m-2" id="view-${venue.id}" data-bs-toggle="modal" data-bs-target="#venueModal">view</button>
			${
        user && user.name === venue.owner.name
          ? `<button class="btn btn-info p-2 px-3 m-2" id="update-${venue.id}" data-bs-toggle="modal" data-bs-target="#updateVenueModal">update</button><button class="btn btn-danger p-2 px-3 m-2" id="delete-${venue.id}">delete</button>`
          : ""
      }
    </div>
  </div>
</div>
  `);

  $venueCard.find(`#view-${venue.id}`).on("click", function () {
    updateVenueModal(venue);
  });

  $venueCard.find(`#update-${venue.id}`).on("click", function () {
    console.log(venue);
    $("#updateVenueModal h1").text(venue.name);
    $("#updateVenueName").val(venue.name);
    $("#updateVenueDescription").val(venue.description);
    $("#updateVenueMediaUrl").val(venue.media[0].url);
    $("#updateVenueMediaAlt").val(venue.media[0].alt);
    $("#updateVenuePrice").val(venue.price);
    $("#updateVenueMaxGuests").val(venue.maxGuests);
    $("#updateVenueRating").val(venue.rating);
    $("#updateVenueAddress").val(venue.location.address);
    $("#updateVenueCity").val(venue.location.city);
    $("#updateVenueZip").val(venue.location.zip);
    $("#updateVenueCountry").val(venue.location.country);
    $("#updateVenueContinent").val(venue.location.continent);
    $("#updateVenueLat").val(venue.location.lat);
    $("#updateVenueLng").val(venue.location.lng);
    //select true or false
    $("#updateVenueMetaWifi").val(String(venue.meta.wifi));
    $("#updateVenueMetaParking").val(String(venue.meta.parking));
    $("#updateVenueMetaBreakfast").val(String(venue.meta.breakfast));
    $("#updateVenueMetaPets").val(String(venue.meta.pets));
  });

  $venueCard.find(`#delete-${venue.id}`).on("click", async function () {
    await deleteVenue(venue.id);
    Router();
  });

  return $venueCard;
}
