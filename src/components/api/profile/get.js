import { apiBaseUrl } from "../../../data/constants.js";
import { getSession } from "../../handlers/session/session.js";

export async function getProfile(name = "") {
  try {
    const session = getSession();
    if (!session) {
      return;
    }

    const response = await $.ajax({
      url: apiBaseUrl + "holidaze/profiles" + (name ? `/${name}` : "") + "?_bookings=true&_venues=true",
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "X-Noroff-API-Key": session.apiKey,
      },
    });

    return response;
  } catch (error) {
    console.log("status:" + error.status, "message:" + error.responseJSON.message);
    return { error: { status: error.status, message: error.responseJSON.message } };
  }
}
