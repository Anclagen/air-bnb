import { apiBaseUrl } from "../../data/constants.js";

/**
 * Fetches venues from the API, with optional parameters
 * @param {Object} options - sort, order, bookings, owner
 * @param {String} id - venue uuid
 * @returns
 */
export async function getVenues(options = { sort: "created", order: "desc", bookings: true, owner: true, limit: 100, offset: 0 }, id = null) {
  try {
    console.log(options);
    const response = await $.ajax({
      url:
        apiBaseUrl +
        "holidaze/venues" +
        (id ? `/${id}` : "") +
        `?limit=${options.limit ? options.limit : 100}` +
        `&offset=${options.offset ? options.offset : 0}` +
        (options.sort && !id ? `&sort=${options.sort}` : "") +
        (options.order && !id ? `&order=${options.order}` : "") +
        (options.bookings ? `&_bookings=${options.bookings}` : "") +
        (options.owner ? `&_owner=${options.owner}` : ""),
    });
    console.log(response);
    //filter out if "string" or "test" is in either the venue name and description
    const data = response.data.filter((venue) => {
      return !venue.name.toLowerCase().includes("string") && !venue.name.toLowerCase().includes("test") && !venue.description.toLowerCase().includes("test");
    });

    return { data, meta: response.meta };
  } catch (error) {
    console.log("status:" + error.status, "message:" + error.responseJSON.status);
    return { data: [], meta: { error: { status: error.status, message: error.responseJSON.status } } };
  }
}
