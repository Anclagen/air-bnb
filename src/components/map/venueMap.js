import { updateVenueModal } from "../templates/modals/venueModal.js";
import L from "leaflet";
import $ from "jquery";

export async function loadMap(data = []) {
  //set zoom on europe

  const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 3, // Minimum zoom level
    maxZoom: 19, // Maximum zoom level
  });

  const osmHOT = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France",
  });

  var baseMaps = {
    OpenStreetMap: osm,
    "OpenStreetMap.HOT": osmHOT,
  };

  let map = L.map("venueMap", { zoomSnap: 0.25, center: [39.73, -104.99], zoom: 10, layers: [osm, osmHOT] });

  var layerControl = L.control.layers(baseMaps).addTo(map);

  data.forEach((venue, i) => {
    let lat = venue.location.lat;
    let lng = venue.location.lng;

    // If lat and lng are 0, generate random coordinates for Europe or America
    if ((lat === 0 && lng === 0) || (lat === null && lng === null)) {
      if (i % 2 === 0) {
        // Europe
        lat = Math.random() * (71 - 36) + 36; // Latitude between 36 and 71
        lng = Math.random() * (40 - -10) - 10; // Longitude between -10 and 40
      } else {
        // America
        lat = Math.random() * (71 - 24) + 24; // Latitude between 24 and 71
        lng = Math.random() * (-66 - -125) - 125; // Longitude between -125 and -66
      }
    }
    //   <div class="card m-2 w-100">
    //   ${venue.media[0] ? `<img src="${venue.media[0].url}" class="card-img-top" alt="${venue.name}" />` : ""}
    //   <div class="card-body">
    //     <h5 class="card-title">${venue.name}</h5>
    //     <p class="card-text">${venue.description}</p>
    //     <p class="card-text">Max Guests: ${venue.maxGuests}</p>
    //     <p class="card-text">Location: ${venue.location.city}, ${venue.location.country}</p>
    //     <p> ${venue.meta.wifi ? wifi : noWifi} ${venue.meta.parking ? parking : noParking} ${venue.meta.breakfast ? food : noFood} ${venue.meta.pets ? pet : noPet}</p>
    //     <button class="btn btn-primary p-2 px-3 ms-2" id="${venue.id}" data-bs-toggle="modal" data-bs-target="#venueModal">view</button>
    //   </div>
    // </div>
    if (lat || lng) {
      var popupContent = `<div class="card w-100 marker-card">
      ${venue.media[0] ? `<img src="${venue.media[0].url}" class="card-img-top-marker" alt="${venue.name}" />` : ""}
      <div class="card-body">
        <h5 class="card-title">${venue.name}</h5>
        <p class="card-text">${venue.description}</p>
        <p class="card-text">Max Guests: ${venue.maxGuests}</p>
        <button class="btn btn-primary p-2 px-3 ms-2" id="${venue.id}" data-bs-toggle="modal" data-bs-target="#venueModal">view</button>
      </div>
    </div>`;

      const marker = L.marker([lat, lng]).addTo(map).bindPopup(popupContent);

      marker.on("popupopen", function () {
        $(`#${venue.id}`).on("click", () => {
          updateVenueModal(venue);
        });
      });
    }
  });
}

// import { config } from "dotenv";
// config();

// export async function loadMap(data = []) {
//   const response = await fetch("https://v2.api.noroff.dev/holidaze/venues");
//   const response = await fetch("https://api.noroff.dev/api/v1/holidaze/venues?limit=1");
//   const data = await response.json();
//   console.log(data);
//   Address conversion to coordinates using geocode.xyz, but bulk processing on free tier is limited to what fits in a single URL. This is a problem when there are many venues.
//   const addresses = data.map(
//     (venue) =>
//       `${venue.location.address ? venue.location.address + ", " : ""} ${venue.location.postalCode ? venue.location.postalCode + ", " : ""}, ${venue.location.city ? venue.location.city + ", " : ""}, ${
//         venue.location.country ? venue.location.country : ""
//       }`
//   );
//   const bulkProcessing = await fetch(`https://geocode.xyz/${addresses.join("|")}?json=1&auth=${process.env.GEOCODE_API_KEY}`);
//   const coords = await response.json();
//   console.log(bulkProcessing);

//   var mymap = L.map("venueMap").setView([10, 10], 10);

//   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     maxZoom: 19,
//   }).addTo(mymap);

//   data.forEach((venue, i) => {
//     if (venue.location.lat && venue.location.lng) {
//       var popupContent = `<b>${venue.name}</b><br />${venue.description}`;

//       if (venue.media && venue.media.length > 0) {
//         popupContent += `<br /><img src="${venue.media[0].url}" alt="${venue.media[0].alt}" style="width: 100px;">`;
//       }
//       L.marker([venue.location.lat, venue.location.lng]).addTo(mymap).bindPopup(popupContent).openPopup();
//     }
//   });
// }
