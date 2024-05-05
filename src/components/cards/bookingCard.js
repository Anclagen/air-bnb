import { updateVenueModal } from "../templates/modals/venueModal.js";

export function venueCard(booking) {
  const venue = booking.venue;
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
      <button class="btn btn-primary p-2 px-3 ms-2" id="${venue.id}" data-bs-toggle="modal" data-bs-target="#venueModal">view</button>
    </div>
  </div>
</div>
  `);

  $venueCard.find("button").on("click", function () {
    console.log(venue);
    updateVenueModal(venue);
  });

  return $venueCard;
}
