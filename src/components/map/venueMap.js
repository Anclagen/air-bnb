// import { config } from "dotenv";
// config();

export async function loadMap() {
  const response = await fetch("https://v2.api.noroff.dev/holidaze/venues");
  // const response = await fetch("https://api.noroff.dev/api/v1/holidaze/venues?limit=1");
  const data = await response.json();
  console.log(data);
  // Address conversion to coordinates using geocode.xyz, but bulk processing on free tier is limited to what fits in a single URL. This is a problem when there are many venues.
  // const addresses = data.map(
  //   (venue) =>
  //     `${venue.location.address ? venue.location.address + ", " : ""} ${venue.location.postalCode ? venue.location.postalCode + ", " : ""}, ${venue.location.city ? venue.location.city + ", " : ""}, ${
  //       venue.location.country ? venue.location.country : ""
  //     }`
  // );
  // const bulkProcessing = await fetch(`https://geocode.xyz/${addresses.join("|")}?json=1&auth=${process.env.GEOCODE_API_KEY}`);
  // const coords = await response.json();
  // console.log(bulkProcessing);

  var mymap = L.map("venueMap").setView([10, 10], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(mymap);

  data.data.forEach((venue, i) => {
    if (venue.location.lat && venue.location.lng) {
      var popupContent = `<b>${venue.name}</b><br />${venue.description}`;

      if (venue.media && venue.media.length > 0) {
        popupContent += `<br /><img src="${venue.media[0].url}" alt="${venue.media[0].alt}" style="width: 100px;">`;
      }
      L.marker([venue.location.lat, venue.location.lng]).addTo(mymap).bindPopup(popupContent).openPopup();
    }
  });

  L.marker([33, 34]).addTo(mymap).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
}
