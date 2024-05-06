import { apiBaseUrl } from "../../data/constants.js";

export async function register(name, email, password) {
  try {
    const response = await $.ajax({
      url: apiBaseUrl + "auth/register",
      method: "POST",
      data: JSON.stringify({
        name,
        email,
        password,
      }),
      contentType: "application/json",
    });
    return response;
  } catch (error) {
    console.log(error);
    return { error: error.responseJSON.errors, code: error.responseJSON.statusCode, message: error.responseJSON.status };
  }
}
