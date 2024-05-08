export function updateVenueModal(venue) {
  const $modal = $("#venueModal");

  function owner(venue) {
    return `
    <h2>Owner</h2>
    <p>${venue.owner.name}</p>
    <p>${venue.owner.email}</p>
    <p>${venue.owner.phone}</p>
    `;
  }

  $modal.find(".modal-title").text(venue.name);
  $modal.find(".modal-body").html(`
  ${venue.media[0] ? `<img src="${venue.media[0].url}" class="card-img-top" alt="${venue.name}" />` : ""}
  <p>${venue.rating}</p>
  <p>${venue.description}</p>
  <p>${venue.location.address}</p>
  <p>${venue.location.city}</p>
  <p>${venue.location.zip}</p>
  <p>${venue.location.country}</p>
  <p>${venue.location.continent}</p>
  <p>Price: ${venue.price} NOK</p>
  <p>Max guests: ${venue.maxGuests}</p>
  <p>Wifi: ${venue.meta.wifi ? "Yes" : "No"}</p>
  <p>Parking: ${venue.meta.parking ? "Yes" : "No"}</p>
  <p>Breakfast: ${venue.meta.breakfast ? "Yes" : "No"}</p>
  <p>Pets: ${venue.meta.pets ? "Yes" : "No"}</p>
  ${venue.owner ? owner(venue) : ""}
  `);

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
