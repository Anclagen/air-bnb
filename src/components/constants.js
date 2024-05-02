export const apiBaseUrl = "https://v2.api.noroff.dev/";
export const registerURL = apiBaseUrl + "auth/register";
export const loginURL = apiBaseUrl + "/auth/login";

// basics of using the tokens
// const options = {
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//     "X-Noroff-API-Key": apiKey.data.key
//   }
// }

// const response = await fetch(`${NOROFF_API_URL}/social/posts`, options)
// const data = await response.json()
