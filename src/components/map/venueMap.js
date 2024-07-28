import { updateVenueModal } from "../templates/modals/venueModal.js";
import L from "leaflet";
import $ from "jquery";
import { wifi, noWifi, parking, noParking, food, noFood, pet, noPet } from "../../icons/index.js";
import { min } from "date-fns";

export async function loadMap(data = []) {
  const southWest = L.latLng(-85, -180);
  const northEast = L.latLng(85, 180);
  const bounds = L.latLngBounds(southWest, northEast);
  //set zoom on europe
  const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 3, // Minimum zoom level
    maxZoom: 5, // Maximum zoom level
    noWrap: true, // No wrapping of the map
  });

  const osmHOT = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    minZoom: 3,
    maxZoom: 5,
    attribution: "© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France",
    noWrap: true,
  });

  var baseMaps = {
    OpenStreetMap: osm,
    "OpenStreetMap.HOT": osmHOT,
  };

  let map = L.map("venueMap", { zoomSnap: 0.25, center: [50.0, 13.99], minZoom: 3, maxZoom: 5, maxBounds: bounds, maxBoundsViscosity: 1.0, layers: [osm, osmHOT], worldCopyJump: false });

  // Display the current zoom level
  const zoomLevelElement = document.getElementById("zoom-level");

  function updateZoomLevel() {
    zoomLevelElement.innerHTML = `Zoom Level: ${map.getZoom()}`;
  }

  map.setView([50.0, 13.99], 3);

  // Update zoom level display initially and on zoom end
  map.on("zoomend", updateZoomLevel);
  updateZoomLevel();

  var layerControl = L.control.layers(baseMaps).addTo(map);
  let markersGroup = L.layerGroup().addTo(map);

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
    if (lat || lng) {
      var popupContent = `<div class="card w-100 marker-card">
      ${venue.media[0] ? `<img src="${venue.media[0].url}" class="card-img-top-marker" alt="${venue.name}" />` : ""}
      <div class="card-body">
        <h5 class="card-title">${venue.name}</h5>
        <p class="card-text">${venue.description}</p>
        <p class="card-text">Max Guests: ${venue.maxGuests}</p>
        <p> ${venue.meta.wifi ? wifi : noWifi} ${venue.meta.parking ? parking : noParking} ${venue.meta.breakfast ? food : noFood} ${venue.meta.pets ? pet : noPet}</p>
        <button class="btn btn-primary p-2 px-3 ms-2" id="${venue.id}" data-bs-toggle="modal" data-bs-target="#venueModal">view</button>
      </div>
    </div>`;

      const marker = L.marker([lat, lng]).bindPopup(popupContent);
      markersGroup.addLayer(marker);

      marker.on("popupopen", function () {
        $(`#${venue.id}`).on("click", () => {
          updateVenueModal(venue);
        });
      });
    }
  });

  function filterMarkers(data, L, markersGroup) {
    let options = {
      wifi: document.getElementById("wifi").checked,
      parking: document.getElementById("parking").checked,
      breakfast: document.getElementById("breakfast").checked,
      pets: document.getElementById("pets").checked,
      guests: document.getElementById("guests").value,
      guestsStrict: document.getElementById("guests-strict").checked, //exact match guest numbers
      maxGuestOverFlow: document.getElementById("max-guest-overflow").value, // number over the guest number
      minPrice: document.getElementById("min-price").value,
      maxPrice: document.getElementById("max-price").value,
      minRating: document.getElementById("min-rating").value,
    };

    let filteredData = data.filter((venue) => {
      if (options.wifi && !venue.meta.wifi) {
        return false;
      }
      if (options.parking && !venue.meta.parking) {
        return false;
      }
      if (options.breakfast && !venue.meta.breakfast) {
        return false;
      }
      if (options.pets && !venue.meta.pets) {
        return false;
      }
      if (options.guests && venue.maxGuests < options.guests) {
        return false;
      }
      if (options.guestsStrict && venue.maxGuests !== options.guests) {
        return false;
      }
      if (options.maxGuestOverFlow && venue.maxGuests < options.guests + options.maxGuestOverFlow) {
        return false;
      }
      if (options.minPrice && venue.price < options.minPrice) {
        return false;
      }
      if (options.maxPrice && venue.price > options.maxPrice) {
        return false;
      }
      if (options.minRating && venue.rating < options.minRating) {
        return false;
      }
      return true;
    });
  }
}

const exampleData = {
  id: "9f228eb9-c200-4ac4-ac98-2a1e8544bd55",
  name: "zzzGreat Venue",
  description: "this is an awesome venue",
  media: [
    {
      url: "https://idologyasheville.com/img/Things-You-Never-Knew-About-Your-Lakehouse-Home-Floors_IDology-Asheville.jpg",
      alt: "My media",
    },
  ],
  price: 3000,
  maxGuests: 4,
  rating: 0,
  created: "2024-05-19T17:28:36.644Z",
  updated: "2024-05-28T20:16:30.012Z",
  meta: {
    wifi: false,
    parking: false,
    breakfast: true,
    pets: false,
  },
  location: {
    address: "Oslo",
    city: "Oslo",
    zip: null,
    country: "Norway",
    continent: null,
    lat: 0,
    lng: 0,
  },
  _count: {
    bookings: 93,
  },
};
