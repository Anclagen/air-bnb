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
    <div class="row" id="newest"></div>
  </section>
  `;
  root.html(content);

  // fetch data
  $.ajax({
    url: apiBaseUrl + "holidaze/venues",
    success: function (response) {
      //filter out if "string" or "test" is in either the venue name and description
      const data = response.data.filter((venue) => {
        return !venue.name.toLowerCase().includes("string") && !venue.name.toLowerCase().includes("test") && !venue.description.toLowerCase().includes("test");
      });

      console.log(response);
      console.log(data);
      const newest = $("#newest");
      const popular = $("#popular");
      const featured = $("#featured");

      data.forEach((venue) => {
        const venueCard = `
        <div class="col-md-4">
          <div class="card m-2">
            ${venue.media[0] ? `<img src="${venue.media[0].url}" class="card-img-top" alt="${venue.name}" />` : ""}
            <div class="card-body">
              <h5 class="card-title
              ">${venue.name}</h5>
              <p class="card-text">${venue.description}</p>
              <a href="/venue/${venue.id}" class="btn btn-primary">View</a>
            </div>
          </div>
        </div>
        `;

        newest.append(venueCard);
        popular.append(venueCard);
        featured.append(venueCard);
      });
    },
    error: function (error) {
      console.log(error.responseJSON);
    },
  });

  // render data
}
