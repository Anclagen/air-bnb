import { getSession } from "../../handlers/session/session.js";
import $ from "jquery";

export async function deleteProfile() {
  const session = getSession();
  const name = session.name;
  try {
    const response = await $.ajax({
      url: apiBaseUrl + "holidaze/profiles" + `/${name}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "X-Noroff-API-Key": session.apiKey,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return { error: error.responseJSON.errors, code: error.responseJSON.statusCode, message: error.responseJSON.status };
  }
}
