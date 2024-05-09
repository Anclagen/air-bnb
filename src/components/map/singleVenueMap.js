export async function singleVenueMap(venue) {
  let lat = venue.location.lat;
  let lng = venue.location.lng;

  // If lat and lng are 0 or null, generate random coordinates for Europe or America
  if (lat === 0 || lng === 0 || lat === null || lng === null) {
    lat = Math.random() * (71 - 36) + 36; // Latitude between 36 and 71
    lng = Math.random() * (40 - -10) - 10; // Longitude between -10 and 40
  }

  // Initialize the map with the venue's coordinates
  var mymap = L.map("singleVenueMap").setView([10, 10], 10);

  // Tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 2,
    maxZoom: 19,
  }).addTo(mymap);

  // Create marker and popup if coordinates are valid
  var popupContent = `<div class="card w-100 marker-card" style="width:250px;">
  ${venue.media[0] ? `<img src="${venue.media[0].url}" class="card-img-top-marker" alt="${venue.name}" />` : ""}
  <div class="card-body">
    <h5 class="card-title">${venue.name}</h5>
    <p class="card-text">${venue.description}</p>
    <p class="card-text">Max Guests: ${venue.maxGuests}</p>
    <button class="btn btn-primary p-2 px-3 ms-2" id="${venue.id}" data-bs-toggle="modal" data-bs-target="#venueModal">view</button>
  </div>
</div>`;

  const marker = L.marker([lat, lng]).addTo(mymap).bindPopup(popupContent).openPopup();

  marker.on("popupopen", function () {
    // $(`#${venue.id}`).on("click", () => {
    //   updateVenueModal(venue);
    // });
  });

  // const marker = L.marker([lat, lng]).addTo(mymap).bindPopup(popupContent);
  // // Automatically open the popup
  // marker
}
