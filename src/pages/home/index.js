import { apiBaseUrl } from "../../components/constants.js";

export function Home() {
  const root = $("#root-main");
  let content = `
 <section>
  <div class="banner">
    <div class="banner-content p-3 m-2 rounded">
      <h1 class="word-wrap">Welcome To Holidaze</h1>
      <p>Find your perfect holiday accommodation</p>
      <form class="searchForm">
        <input class="p-2 rounded form-control" type="text" name="search" placeholder="Search for accommodation" />
        <button class="p-2 rounded btn-primary mt-2" type="submit">Search</button>
      </form>
    </div>
  </div>
  </section>
  <section class="container-lg p-3 mt-2">
    <h2 class="text-center">Venues</h2>
   <div class="row d-flex align-items-stretch" id="newest"></div>
  </section>
  `;
  root.html(content);

  // fetch data
  $.ajax({
    url: apiBaseUrl + "holidaze/venues?_owner=true&_bookings=true",
    success: function (response) {
      //filter out if "string" or "test" is in either the venue name and description
      const data = response.data.filter((venue) => {
        return !venue.name.toLowerCase().includes("string") && !venue.name.toLowerCase().includes("test") && !venue.description.toLowerCase().includes("test");
      });

      console.log(response);
      console.log(data);
      const newest = $("#newest");

      data.forEach((venue) => {
        const venueCard = `
        <div class="col-sm-6 col-md-4 col-xl-3 d-flex align-items-stretch">
        <div class="card m-2 w-100">
          ${venue.media[0] ? `<img src="${venue.media[0].url}" class="card-img-top" alt="${venue.name}" />` : ""}
          <div class="card-body">
            <h5 class="card-title">${venue.name}</h5>
            <p class="card-text">${venue.description}</p>
            <button class="btn btn-primary p-2 px-3 ms-2" id="${venue.id}" data-bs-toggle="modal" data-bs-target="#venueModal">view</button>
          </div>
        </div>
      </div>
        `;

        const $venueCard = $(venueCard);
        const $modal = $("#venueModal");
        $venueCard.find("button").on("click", function () {
          console.log("clicked");
          console.log(venue.id);
          $modal.find(".modal-title").text(venue.name);
          $modal.find(".modal-body").html(`
          <img src="${venue.media[0].url}" class="card-img-top" alt="${venue.name}" />
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
          <p>Owner: ${venue.owner.name}</p>
          <p>Email: ${venue.owner.email}</p>
          <p>Bio: ${venue.owner.bio}
          `);
        });

        newest.append($venueCard);
      });
    },
    error: function (error) {
      console.log(error.responseJSON);
    },
  });

  // render data
}
