import { apiBaseUrl } from "../../../data/constants.js";

export async function login(email, password) {
  try {
    const response = await $.ajax({
      url: apiBaseUrl + "auth/login?_holidaze=true",
      method: "POST",
      data: JSON.stringify({
        email,
        password,
      }),
      contentType: "application/json",
    });

    const apiKey = await $.ajax({
      url: apiBaseUrl + "auth/create-api-key",
      method: "POST",
      body: JSON.stringify({ name: response.data.name }),
      headers: {
        Authorization: `Bearer ${response.data.accessToken}`,
      },
    });

    response.data.apiKey = apiKey.data.key;
    return response;
  } catch (error) {
    console.log(error);
    return { error: error.responseJSON.errors, code: error.responseJSON.statusCode, message: error.responseJSON.status };
  }
}
