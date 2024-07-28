import { loadMap } from "../../components/map/venueMap.js";
import { apiBaseUrl } from "../../data/constants.js";
import $ from "jquery";
import L from "leaflet";

export function Map() {
  const root = $("#root-main");
  let content = `<section>
      <h1>Map</h1>
        <div id="zoom-level">Zoom Level: </div>
      <div class="position-relative">
      <div class="position-absolute top-0 left-0 z-1 p-2">
        <button class="btn btn-primary" id="back">Back</button>
      </div>
      <div class="z-2" id="venueMap" style="height: 100vh;"></div>
      <div>
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
      console.log(data);
      loadMap(data);
    },
    error: function (error) {
      console.log(error.responseJSON);
    },
  });
}
