import { updateVenueModal } from "../templates/modals/venueModal.js";

export function venueCard(venue) {
  const $venueCard = $(`
  <div class="col-sm-6 col-md-4 col-xl-3 d-flex align-items-stretch">
  <div class="card m-2 w-100">
    ${venue.media[0] ? `<img src="${venue.media[0].url}" class="card-img-top" alt="${venue.name}" />` : ""}
    <div class="card-body">
      <h5 class="card-title">${venue.name}</h5>
      <p class="card-text">${venue.description}</p>
      <p class="card-text">Max Guests: ${venue.maxGuests}</p>
      <p class="card-text">Location: ${venue.location.city}, ${venue.location.country}</p>
      <p> ${venue.meta.wifi ? wifi : noWifi} ${venue.meta.parking ? parking : noParking} ${venue.meta.breakfast ? food : noFood} ${venue.meta.pets ? pet : noPet}</p>
      <button class="btn btn-primary p-2 px-3 ms-2" id="${venue.id}" data-bs-toggle="modal" data-bs-target="#venueModal">view</button>
    </div>
  </div>
</div>
  `);

  $venueCard.find("button").on("click", function () {
    updateVenueModal(venue);
  });

  return $venueCard;
}

const wifi = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wifi" viewBox="0 0 16 16">
<path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.44 12.44 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049"/>
<path d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.46 9.46 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065m-2.183 2.183c.226-.226.185-.605-.1-.75A6.5 6.5 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.5 5.5 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091zM9.06 12.44c.196-.196.198-.52-.04-.66A2 2 0 0 0 8 11.5a2 2 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z"/>
</svg>`;
const noWifi = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wifi-off" viewBox="0 0 16 16">
<path d="M10.706 3.294A12.6 12.6 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4q.946 0 1.852.148zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.45 8.45 0 0 1 3.51-1.27zm2.596 1.404.785-.785q.947.362 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.5 8.5 0 0 0-1.98-.932zM8 10l.933-.933a6.5 6.5 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.53.53 0 0 1-.611.09A5.5 5.5 0 0 0 8 10m4.905-4.905.747-.747q.886.451 1.685 1.03a.485.485 0 0 1 .047.737.52.52 0 0 1-.668.05 11.5 11.5 0 0 0-1.811-1.07M9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A2 2 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75z"/>
</svg>`;
const parking = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-p-circle" viewBox="0 0 16 16">
<path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z"/>
</svg>`;
const noParking = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sign-no-parking" viewBox="0 0 16 16">
<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m5.29-3.416L9.63 8.923C10.5 8.523 11 7.66 11 6.586c0-1.482-.955-2.584-2.538-2.584H5.5v.79L3.416 2.71a7 7 0 0 1 9.874 9.874m-.706.707A7 7 0 0 1 2.71 3.417l2.79 2.79V12h1.283V9.164h1.674zM8.726 8.019 6.777 6.07v-.966H8.27c.893 0 1.419.539 1.419 1.482 0 .769-.35 1.273-.963 1.433m-1.949-.534.59.59h-.59z"/>
</svg>`;
const pet = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paw" viewBox="0 0 16 16">
<path d="M5 0C3.89543 0 3 0.895431 3 2V3C3 4.10457 3.89543 5 5 5C6.10457 5 7 4.10457 7 3V2C7 0.895431 6.10457 0 5 0Z"/>
<path d="M10 0C8.89543 0 8 0.895431 8 2V3C8 4.10457 8.89543 5 10 5C11.1046 5 12 4.10457 12 3V2C12 0.895431 11.1046 0 10 0Z"/>
<path d="M2 5C0.895431 5 0 5.89543 0 7V7.5C0 8.60457 0.895431 9.5 2 9.5C3.10457 9.5 4 8.60457 4 7.5V7C4 5.89543 3.10457 5 2 5Z"/>
<path d="M13 5C11.8954 5 11 5.89543 11 7V7.5C11 8.60457 11.8954 9.5 13 9.5C14.1046 9.5 15 8.60457 15 7.5V7C15 5.89543 14.1046 5 13 5Z"/>
<path d="M9.61273 7.77893C8.51793 6.44953 6.48207 6.44953 5.38727 7.77893L2.46943 11.322C1.2614 12.7889 2.30486 15 4.20516 15C4.47668 15 4.74447 14.9368 4.98732 14.8154L5.34699 14.6355C6.70234 13.9578 8.29766 13.9578 9.65301 14.6355L10.0127 14.8154C10.2555 14.9368 10.5233 15 10.7948 15C12.6951 15 13.7386 12.7889 12.5306 11.322L9.61273 7.77893Z"/>
</svg>`;
const noPet = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paw"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
viewBox="0 0 511.978 511.978" xml:space="preserve">
<path style="fill:none" d="M491.855,156.337c-12.89-30.483-31.342-57.857-54.856-81.371
	c-23.499-23.499-50.874-41.952-81.356-54.842C324.066,6.764,290.552,0,255.99,0c-34.561,0-68.075,6.765-99.652,20.124
	c-30.483,12.89-57.857,31.343-81.355,54.842c-23.515,23.514-41.967,50.888-54.857,81.371c-13.36,31.561-20.125,65.09-20.125,99.652
	c0,34.545,6.766,68.074,20.124,99.636c12.89,30.483,31.342,57.857,54.857,81.372c23.499,23.499,50.873,41.951,81.355,54.856
	c31.577,13.344,65.092,20.125,99.652,20.125c34.562,0,68.076-6.781,99.652-20.125c30.482-12.905,57.857-31.357,81.356-54.856
	c23.515-23.515,41.967-50.889,54.856-81.372c13.358-31.562,20.124-65.091,20.124-99.636
	C511.979,221.427,505.214,187.898,491.855,156.337z"/>
<path style="fill:none" d="M406.828,406.826c-83.309,83.309-218.366,83.309-301.675,0c-83.31-83.31-83.31-218.381,0-301.69
	c83.309-83.309,218.367-83.309,301.675,0S490.136,323.516,406.828,406.826z"/>
<g>
	<path d="M255.99,230.724c-27.577,0-53.701,11.718-73.591,32.998c-19.155,20.499-30.124,47.983-30.124,75.45
		c0,20.78,1.797,34.936,5.656,44.545c5.812,14.5,15.984,17.531,23.499,17.531l0,0c9.781,0,19.875-5.078,31.562-10.969
		c13.155-6.641,28.061-14.156,42.998-14.156c14.952,0,29.796,6.953,42.89,13.078c11.624,5.422,21.655,10.109,31.295,10.109
		c7.515,0,17.733-2.922,23.687-16.891c3.984-9.358,5.844-23.108,5.844-43.248c0-27.467-10.969-54.967-30.124-75.45
		C309.692,242.442,283.567,230.724,255.99,230.724z"/>
	<path d="M380.063,168.695c-23.374,0-41.687,25.125-41.687,57.186c0,14.515,3.859,28.296,10.875,38.811
		c7.781,11.688,19.015,18.391,30.812,18.391c23.374,0,41.687-25.124,41.687-57.201C421.75,193.804,403.437,168.695,380.063,168.695z
		"/>
	<path d="M302.52,221.037c23.373,0,41.685-25.123,41.685-57.185c0-32.077-18.312-57.201-41.685-57.201
		c-23.375,0-41.687,25.124-41.687,57.201C260.834,195.914,279.145,221.037,302.52,221.037z"/>
	<path d="M209.461,221.037L209.461,221.037c23.374,0,41.686-25.123,41.686-57.185
		c0-14.516-3.859-28.296-10.875-38.827c-7.781-11.671-19.014-18.374-30.811-18.374l0,0c-23.374,0-41.686,25.124-41.686,57.201
		C167.775,195.914,186.087,221.037,209.461,221.037z"/>
	<path d="M162.728,264.691c7.015-10.515,10.875-24.296,10.875-38.811s-3.859-28.296-10.875-38.811
		c-7.797-11.688-19.015-18.375-30.811-18.375s-23.031,6.688-30.812,18.375c-7.016,10.515-10.875,24.296-10.875,38.811
		c0,32.077,18.312,57.201,41.686,57.201C143.714,283.082,154.931,276.379,162.728,264.691z"/>
</g>
<path d="M414.375,97.589c-42.312-42.295-98.559-65.591-158.385-65.591c-29.077,0-57.435,5.516-84.278,16.391
	c-27.795,11.28-52.732,27.827-74.106,49.2C55.295,139.901,32,196.149,32,255.989c0,59.826,23.296,116.073,65.606,158.384
	c42.311,42.296,98.558,65.606,158.384,65.606c29.077,0,57.436-5.531,84.277-16.406c27.796-11.279,52.732-27.826,74.107-49.2
	c42.311-42.311,65.606-98.558,65.606-158.384C479.981,196.148,456.685,139.9,414.375,97.589z M112.683,112.682
	c38.281-38.279,89.169-59.357,143.307-59.357c50.562,0,98.293,18.391,135.557,52.014L105.34,391.546
	c-33.608-37.281-52.014-84.996-52.014-135.557C53.326,201.85,74.42,150.962,112.683,112.682z M399.297,399.28
	c-38.28,38.279-89.168,59.357-143.307,59.357c-50.56,0-98.293-18.391-135.557-52.015L406.64,120.416
	c33.607,37.28,52.014,84.997,52.014,135.573C458.654,310.112,437.561,361,399.297,399.28z"/>
</svg>`;

const food = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><style type="text/css">
.st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
</style>
<path class="st0" d="M19,10c0-2.8-2.2-5-5-5v12v4v6.1c0,1,0.8,1.9,1.9,1.9h0c1.1,0,2-1,1.9-2.1l-0.5-5c-0.1-1.3,0.6-2.5,1.8-2.9h0
V10z"/>
<path class="st0" d="M26.7,17.7c-0.1-1.3,0.3-2.6,1.2-3.5c0.7-0.7,1.1-2,1.1-3.7c0-3-1.3-5.5-3-5.5s-3,2.4-3,5.5
c0,1.7,0.4,2.9,1.1,3.7c0.9,1,1.3,2.2,1.2,3.5l-1,9.3c-0.1,1,0.7,2,1.7,2c1.1,0,1.9-0.9,1.7-2L26.7,17.7z"/>
<path class="st0" d="M3,5v5.5c0,1.7,0.4,2.9,1.1,3.7c0.9,1,1.3,2.2,1.2,3.5l-1,9.3c-0.1,1,0.7,2,1.7,2c1.1,0,1.9-0.9,1.7-2l-1-9.3
c-0.1-1.3,0.3-2.6,1.2-3.5c0.7-0.7,1.1-2,1.1-3.7V5"/>
<line class="st0" x1="6" y1="11" x2="6" y2="5"/></svg>`;

const noFood = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
<g><path d="M48.54,65.67c0.02-0.43,0.2-0.82,0.49-1.11c0.3-0.3,0.72-0.49,1.18-0.49s0.87,0.19,1.18,0.49c0.3,0.3,0.49,0.72,0.49,1.18 v0.33l-3.38,3.38c0.02-1.28,0.04-2.53,0.04-3.71L48.54,65.67L48.54,65.67z M61.44,0c16.97,0,32.33,6.88,43.44,18 c11.12,11.12,18,26.48,18,43.44c0,16.97-6.88,32.33-18,43.44c-11.12,11.12-26.48,18-43.44,18c-16.97,0-32.33-6.88-43.44-18 C6.88,93.77,0,78.41,0,61.44C0,44.47,6.88,29.11,18,18C29.11,6.88,44.48,0,61.44,0L61.44,0L61.44,0z M103.65,27.79l-75.86,75.86 c9.23,7.37,20.93,11.77,33.65,11.77c14.91,0,28.4-6.04,38.17-15.81c9.77-9.77,15.81-23.27,15.81-38.17 C115.42,48.71,111.02,37.02,103.65,27.79L103.65,27.79L103.65,27.79z M22.29,98.61l76.32-76.32C88.93,13.1,75.84,7.46,61.44,7.46 c-14.91,0-28.4,6.04-38.17,15.81C13.5,33.04,7.46,46.53,7.46,61.44C7.46,75.84,13.1,88.93,22.29,98.61L22.29,98.61L22.29,98.61z M51.88,82.53c0,0.19,0.01,0.39,0.02,0.59v0.01c0.04,1.89,0.08,3.79,0.04,5.69c-0.04,1.92-0.17,3.83-0.47,5.76 c-0.04,0.29-0.08,0.58-0.12,0.88l-0.04,0.31c-0.42,3.67-1.72,5.7-3.29,6.61c-0.8,0.46-1.66,0.63-2.52,0.58 c-0.85-0.05-1.7-0.32-2.47-0.74c-1.76-0.96-3.12-2.74-3.23-4.54c-0.07-0.96-0.13-1.92-0.19-2.88l3.18-3.18 c0.07,1.86,0.18,3.72,0.31,5.59c0.49,0.99,1.07,1.68,1.64,2.05c0.38,0.24,0.75,0.35,1.1,0.32c0.35-0.03,0.68-0.19,0.97-0.48 c0.4-0.4,0.74-1.05,0.95-1.94c0.48-2,0.7-4.46,0.79-6.94c0.06-1.51,0.06-3.02,0.05-4.43L51.88,82.53L51.88,82.53z M39.48,78.45 l0-17.68c-1.4-0.49-2.62-1.15-3.69-1.98c-1.11-0.86-2.05-1.91-2.83-3.13c-0.83-1.32-1.46-2.84-1.91-4.56 c-0.44-1.71-0.7-3.63-0.79-5.75l0-0.08c-0.05-1.62-0.01-3.16,0.11-4.6c0.12-1.46,0.33-2.83,0.63-4.12c0.31-1.33,0.71-2.57,1.2-3.72 c0.49-1.15,1.08-2.22,1.75-3.19c0.72-1.03,1.51-1.94,2.35-2.74c0.87-0.82,1.8-1.51,2.77-2.08c1.12-0.65,2.28-1.13,3.48-1.43 c1.21-0.31,2.44-0.44,3.67-0.4c1.23,0.05,2.46,0.27,3.64,0.67c1.16,0.39,2.29,0.96,3.35,1.7l0.02,0.01 c0.9,0.63,1.75,1.38,2.53,2.25c0.76,0.85,1.46,1.81,2.09,2.88c0.88,1.51,1.6,3.42,2.1,5.53c0.51,2.11,0.8,4.43,0.85,6.79 c0.04,1.79-0.07,3.6-0.33,5.35c-0.25,1.66-0.65,3.28-1.2,4.78c-0.62,1.67-1.44,3.22-2.47,4.54c-0.97,1.24-2.13,2.29-3.49,3.08 c-0.86,0.5-1.79,0.89-2.81,1.17c-0.97,0.26-2.02,0.41-3.15,0.43c-0.46,0.01-0.88-0.17-1.18-0.46c-0.3-0.29-0.5-0.71-0.51-1.17 v-0.03c0-0.45,0.17-0.86,0.46-1.15c0.29-0.31,0.71-0.5,1.16-0.51l0.03,0c0.82-0.02,1.59-0.13,2.3-0.32 c0.74-0.2,1.42-0.48,2.04-0.84c1.01-0.59,1.87-1.38,2.6-2.33c0.79-1.03,1.42-2.24,1.91-3.57l0-0.01c0.48-1.3,0.83-2.71,1.04-4.17 c0.23-1.55,0.33-3.16,0.29-4.73c-0.04-2.08-0.3-4.12-0.74-5.97c-0.43-1.84-1.04-3.47-1.78-4.75c-0.5-0.86-1.06-1.63-1.67-2.3 c-0.63-0.69-1.3-1.29-2-1.78c-0.8-0.56-1.64-0.98-2.51-1.28c-0.88-0.3-1.79-0.47-2.7-0.5c-0.91-0.03-1.83,0.07-2.74,0.3 c-0.89,0.23-1.77,0.59-2.62,1.08c-0.75,0.44-1.49,0.99-2.18,1.64c-0.67,0.63-1.3,1.36-1.88,2.19c-0.55,0.8-1.03,1.67-1.44,2.63 c-0.41,0.96-0.74,2-1,3.11l0,0.02c-0.26,1.15-0.44,2.38-0.55,3.7c-0.11,1.33-0.14,2.73-0.1,4.21l0,0.04 c0.08,1.83,0.29,3.46,0.65,4.9c0.36,1.44,0.87,2.69,1.53,3.74c0.63,0.99,1.41,1.82,2.36,2.49c0.95,0.67,2.07,1.18,3.37,1.54l0,0 c0.37,0.08,0.7,0.29,0.93,0.58c0.23,0.29,0.37,0.65,0.37,1.05v15.58L39.48,78.45L39.48,78.45z M77.23,24.59 c0-0.46,0.19-0.87,0.49-1.17c0.3-0.3,0.72-0.49,1.18-0.49c0.46,0,0.88,0.19,1.18,0.49c0.3,0.3,0.49,0.72,0.49,1.18v12.77 l-3.33,3.33V24.59L77.23,24.59z M83.16,24.59c0-0.46,0.19-0.87,0.49-1.17c0.3-0.3,0.72-0.49,1.18-0.49c0.46,0,0.88,0.19,1.18,0.49 c0.3,0.3,0.49,0.72,0.49,1.18v6.85l-3.33,3.33V24.59L83.16,24.59z M86.48,47.93v0.37c0,0.46-0.19,0.87-0.49,1.18 c-0.3,0.3-0.72,0.49-1.18,0.49c-0.12,0-0.23-0.01-0.34-0.04L86.48,47.93L86.48,47.93z M89.31,24.51c0.02-0.42,0.2-0.8,0.48-1.08 c0.3-0.3,0.72-0.49,1.18-0.49s0.87,0.19,1.18,0.49c0.3,0.3,0.49,0.72,0.49,1.18v0.69l-3.34,3.34V24.6 C89.29,24.57,89.3,24.54,89.31,24.51L89.31,24.51z M92.63,41.78v8.62l-0.02,0.21c-0.11,1.82-0.38,3.42-0.8,4.82 c-0.43,1.41-1.03,2.61-1.78,3.6c-0.82,1.07-1.81,1.89-2.97,2.44c-1.15,0.55-2.47,0.85-3.95,0.89c-0.46,0.01-0.88-0.16-1.19-0.45 s-0.51-0.7-0.52-1.16c-0.01-0.46,0.16-0.88,0.45-1.19c0.29-0.31,0.7-0.51,1.16-0.52c0.96-0.03,1.81-0.21,2.54-0.55 c0.72-0.34,1.33-0.83,1.83-1.48L87.39,57c0.54-0.71,0.97-1.61,1.29-2.7c0.32-1.1,0.52-2.4,0.61-3.89v-5.29L92.63,41.78L92.63,41.78 z M71.26,24.44c0.02-0.42,0.21-0.8,0.48-1.08c0.3-0.3,0.72-0.49,1.18-0.49s0.87,0.19,1.17,0.49c0.3,0.3,0.49,0.72,0.49,1.18v18.81 l-3.34,3.34V24.53C71.24,24.5,71.25,24.47,71.26,24.44L71.26,24.44z M77.08,57.33c0.29,0.21,0.61,0.37,0.95,0.48 c0.35,0.11,0.63,0.33,0.83,0.6c0.21,0.28,0.32,0.63,0.32,0.98v37.33c0,0.05,0,0.11-0.01,0.18c0.01,1.15,0.63,1.9,1.46,2.27 c0.38,0.17,0.81,0.25,1.24,0.26c0.43,0.01,0.88-0.07,1.29-0.22l0.01,0c1-0.38,1.81-1.23,1.9-2.56l0-30.22 c0-0.46,0.19-0.87,0.49-1.18c0.3-0.3,0.72-0.49,1.18-0.49c0.46,0,0.88,0.19,1.18,0.49c0.3,0.3,0.49,0.72,0.49,1.18v30.31 c0,0.06,0,0.12-0.01,0.2c-0.09,0.69-0.23,1.32-0.43,1.89c-0.2,0.58-0.46,1.1-0.78,1.56c-0.33,0.48-0.72,0.89-1.17,1.23 c-0.45,0.33-0.95,0.58-1.51,0.76c-0.09,0.04-0.19,0.07-0.29,0.09l-0.01,0c-0.1,0.02-0.21,0.03-0.32,0.03h-3.36 c-0.06,0-0.12,0-0.19-0.01c-0.76-0.08-1.44-0.28-2.03-0.58c-0.59-0.3-1.08-0.71-1.48-1.23c-0.38-0.5-0.65-1.08-0.81-1.75 c-0.16-0.66-0.21-1.4-0.15-2.22V60.49c-0.41-0.22-0.79-0.48-1.15-0.78L77.08,57.33L77.08,57.33z"/>
</g>
</svg>`;
