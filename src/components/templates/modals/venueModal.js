import { ratingStars } from "../ratingStars/ratingStars.js";
import { singleVenueMap } from "../../map/singleVenueMap.js";
import $ from "jquery";

export function updateVenueModal(venue) {
  const $modal = $("#venueModal");

  function owner(venue) {
    return `
    <h2>Owner</h2>
    <div class="row">
      <img src="${venue.owner.avatar.url}" class="rounded col-sm-4 my-auto" style="height:fit-content" alt="${venue.owner.name}" />
      <div class="col-sm-8">
      <p>${venue.owner.name}</p>
          <p>${venue.owner.email}</p>
          <p>${venue.owner.bio}</p>
      </div>
    <div>
    `;
  }

  $modal.find(".modal-title").text(venue.name);
  $modal.find(".modal-body").html(`
  ${venue.media[0] ? `<img src="${venue.media[0].url}" class="card-img-top" alt="${venue.name}" />` : ""}
  <div class="row mb-3">
  <p class="col-md-12 col-lg-4 my-1">${ratingStars(venue.rating)}${venue.rating === 0 ? "(No Ratings Yet.)" : `(${venue.rating})`}</p>
  <p class="col-md-6 col-lg-4  my-1"><b>Max guests:</b> ${venue.maxGuests}</p>
  <p class="col-md-6 col-lg-4  my-1"><b>Price:</b> ${venue.price} NOK</p>
  </div>
  <h2>Description</h2>
  <p>${venue.description}</p>
  <h2>Address</h2>
  <p class="m-0">${venue.location.address}</p>
  <p class="m-0">${venue.location.city}</p>
  <p class="m-0">${venue.location.zip}</p>
  <p class="m-0">${venue.location.country}</p>
  <p class="m-0 mb-3">${venue.location.continent}</p>
  <h2>Extras</h2>
  <p class="m-0"><b>Wifi:</b> ${venue.meta.wifi ? "Yes" : "No"}</p>
  <p class="m-0"><b>Parking:</b> ${venue.meta.parking ? "Yes" : "No"}</p>
  <p class="m-0"><b>Breakfast:</b> ${venue.meta.breakfast ? "Yes" : "No"}</p>
  <p class="m-0"><b>Pets:</b> ${venue.meta.pets ? "Yes" : "No"}</p>
 
  ${venue.owner ? owner(venue) : ""}
  `);

  // <div id="singleVenueMap" style="height:400px; width:300px;"></div>
  // singleVenueMap(venue)

  $("#bookBtn").on("click", () => {
    $("#booking").text(`Book ${venue.name}`);
    for (let i = 1; i <= venue.maxGuests; i++) {
      $("#bookingGuests").append(`<option value="${i}">${i}</option>`);
    }
    $("#bookingPrice").text(`${venue.price} NOK`);
    $("#createBookingBtn").attr("data-venue-id", venue.id);
    //TODO date picker setup
  });
}
