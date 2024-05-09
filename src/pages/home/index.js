import { venueCard } from "../../components/cards/venueCard.js";
import { getVenues } from "../../components/api/venue/get.js";
import { venueLoadingCard } from "../../components/cards/venueLoadingCard.js";

export async function Home() {
  try {
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
   <div class="row d-flex align-items-stretch" id="newest">
   ${Array(20).fill(venueLoadingCard().prop("outerHTML")).join("")}
   </div>
  </section>
  `;
    root.html(content);
    const newest = $("#newest");
    const { data, meta } = await getVenues();
    if (meta.error) {
      newest.html(`<div class="alert alert-danger" role="alert">Status ${meta.error.status}: ${meta.error.message} </div>`); //error message
      return;
    }

    newest.html(""); //clear loading cards

    data.forEach((venue) => {
      newest.append(venueCard(venue));
    });
  } catch (error) {
    console.log(error);
  }
}
