import { loadMap } from "../../components/map/venueMap.js";
import { apiBaseUrl } from "../../data/constants.js";
import $ from "jquery";

export function Map() {
  const root = $("#root-main");
  let content = `<section>
      <h1>Map</h1>
      <div class="z-2" id="venueMap" style="height: 100vh;"></div>
    </section>`;
  root.html(content);
  // fetch data
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
