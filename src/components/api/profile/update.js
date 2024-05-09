import { getSession } from "../../handlers/session/session.js";
import { apiBaseUrl } from "../../../data/constants.js";

export async function updateProfile(bio, avatarUrl, avatarAlt, bannerUrl, bannerAlt) {
  try {
    const user = getSession();
    const response = await $.ajax({
      url: apiBaseUrl + "holidaze/profiles/" + `${user.name}`,
      method: "PUT",
      data: JSON.stringify({
        bio,
        avatar: {
          url: avatarUrl,
          alt: avatarAlt,
        },
        banner: {
          url: bannerUrl,
          alt: bannerAlt,
        },
      }),
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "X-Noroff-API-Key": user.apiKey,
      },
      contentType: "application/json",
    });

    return response;
  } catch (error) {
    console.log(error);
    return { error: error.responseJSON.errors, code: error.responseJSON.statusCode, message: error.responseJSON.status };
  }
}
