import { apiBaseUrl } from "../../../data/constants.js";
import { getSession } from "../../handlers/session/session.js";
import $ from "jquery";

export async function createUpdateVenue(body, id = null) {
  try {
    const user = getSession();
    const response = await $.ajax({
      url: apiBaseUrl + "holidaze/venues" + (id ? `/${id}` : ""),
      method: id ? "PUT" : "POST",
      data: JSON.stringify(body),
      headers: { Authorization: `Bearer ${user.accessToken}`, "X-Noroff-API-Key": user.apiKey },
      contentType: "application/json",
    });
    return response;
  } catch (error) {
    console.log(error);
    return { error: error.responseJSON.errors, code: error.responseJSON.statusCode, message: error.responseJSON.status };
  }
}
