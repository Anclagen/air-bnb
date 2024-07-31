import { apiBaseUrl } from "../../../data/constants.js";
import { getSession } from "../../handlers/session/session.js";
import $ from "jquery";

export async function deleteVenue(id) {
  console.log(id);
  try {
    const user = getSession();
    const response = await $.ajax({
      url: apiBaseUrl + "holidaze/venues/" + id,
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.accessToken}`, "X-Noroff-API-Key": user.apiKey },
    });

    return "Venue deleted";
  } catch (error) {
    console.log(error);
    return { error: error.responseJSON.errors, code: error.responseJSON.statusCode, message: error.responseJSON.status };
  }
}
