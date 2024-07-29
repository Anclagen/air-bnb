import { loadMap } from "../../components/map/venueMap.js";
import { apiBaseUrl } from "../../data/constants.js";
import $ from "jquery";
import L from "leaflet";

export function Map() {
  const root = $("#root-main");
  let content = `<section>
      <div class="z-2 position-relative" id="venueMap" class="display-relative" style="height: calc(100vh - 75px);">
        <h1 class="leaflet-controls title" >Global Venues</h1>
        <div class="leaflet-controls zoom" id="zoom-level">Zoom Level: </div>
        <button class="leaflet-controls leaflet-button" data-bs-toggle="modal" data-bs-target="#filterModal"><span class="visually-hidden">Filter</span> <i class="bi bi-ui-checks"></i></button>
      </div>
 
    </section>`;
  root.html(content);

  //fetch data
  $.ajax({
    url: apiBaseUrl + "holidaze/venues",
    success: function (response) {
      //filter out if "string" or "test" is in either the venue name and description
      let data = response.data.filter((venue) => {
        return !venue.name.toLowerCase().includes("string") && !venue.name.toLowerCase().includes("test") && !venue.description.toLowerCase().includes("test");
      });
      console.log(response, data);
      loadMap(data);
    },
    error: function (error) {
      console.log(error.responseJSON);
    },
  });
}
