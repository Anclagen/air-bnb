import { createUpdateVenue } from "../../api/venue/createUpdate.js";
import { validateForm } from "../../form/validation/validateForm.js";
import { validateUrl } from "../../form/validation/validateUrl.js";
import { errorFeedback } from "../../form/feedback/errorFeedback.js";
import { updateVenueModal } from "../../templates/modals/venueModal.js";
import { Router } from "../../router/router.js";

export async function createVenueFormHandler() {
  try {
    const form = $("#createVenueForm");
    form.on("submit", async (event) => {
      event.preventDefault();
      const name = $("#createVenueName").val();
      const description = $("#createVenueDescription").val();
      const mediaUrl = $("#createVenueMediaUrl").val();
      const mediaAlt = $("#createVenueMediaAlt").val();
      const price = Number($("#createVenuePrice").val());
      const maxGuests = Number($("#createVenueMaxGuests").val());
      const rating = Number($("#createVenueRating").val());
      const wifi = $("#createVenueMetaWifi").val();
      const parking = $("#createVenueMetaParking").val();
      const breakfast = $("#createVenueMetaBreakfast").val();
      const pets = $("#createVenueMetaPets").val();
      const address = $("#createVenueAddress").val();
      const city = $("#createVenueCity").val();
      const zip = $("#createVenueZip").val();
      const country = $("#createVenueCountry").val();
      const continent = $("#createVenueContinent").val();
      const lat = Number($("#createVenueLat").val());
      const lng = Number($("#createVenueLng").val());

      const isValid = validateForm(schema);
      if (!isValid) {
        $("#createVenueFormError").html(errorFeedback("Please fill out all fields correctly."));
        return;
      } else {
        $("#createVenueFormError").html("");
      }

      console.log(wifi, parking, breakfast, pets);
      const venue = {
        name,
        description,
        media: [
          {
            url: mediaUrl,
            alt: mediaAlt,
          },
        ],
        price,
        maxGuests,
        rating,
        meta: {
          wifi: Boolean(wifi),
          parking: Boolean(parking),
          breakfast: Boolean(breakfast),
          pets: Boolean(pets),
        },
        location: {
          address,
          city,
          zip,
          country,
          continent,
          lat,
          lng,
        },
      };

      const response = await createUpdateVenue(venue);
      if (response.error) {
        $("#createVenueFormError").html(errorFeedback(response.error[0].message));
        return;
      } else {
        $("#createVenueFormError").html("");
      }
      //form.trigger("reset");
      updateVenueModal(response.data);
      $("#createVenueModal").modal("hide");
      //open modal
      $("#venueModal").modal("show");
      Router();
    });
  } catch (error) {
    console.log(error);
  }
}

const schema = [
  {
    id: "createVenueName",
    feedbackId: "createVenueNameFeedback",
    validate: (name) => name.length <= 50 && name.length > 0,
    errorMessage: "Name must be less than 50 characters.",
  },
  {
    id: "createVenueDescription",
    feedbackId: "createVenueDescriptionFeedback",
    validate: (description) => description.length <= 500,
    errorMessage: "Description must be less than 500 characters.",
  },
  {
    id: "createVenueMediaUrl",
    feedbackId: "createVenueMediaUrlFeedback",
    validate: (mediaUrl) => validateUrl(mediaUrl),
    errorMessage: "Invalid URL.",
  },
  {
    id: "createVenueMediaAlt",
    feedbackId: "createVenueMediaAltFeedback",
    validate: (mediaAlt) => mediaAlt.length <= 100 && mediaAlt.length > 0,
    errorMessage: "Alt text must be less than 120 characters.",
  },
  {
    id: "createVenuePrice",
    feedbackId: "createVenuePriceFeedback",
    validate: (price) => Number(price) > 0,
    errorMessage: "Price must be greater than 0.",
  },
  {
    id: "createVenueMaxGuests",
    feedbackId: "createVenueMaxGuestsFeedback",
    validate: (maxGuests) => Number(maxGuests) > 0,
    errorMessage: "Max guests must be greater than 0.",
  },
  {
    id: "createVenueRating",
    feedbackId: "createVenueRatingFeedback",
    validate: (rating) => Number(rating) >= 0 && Number(rating) <= 5,
    errorMessage: "Rating must be between 0 and 5.",
  },
  {
    id: "createVenueAddress",
    feedbackId: "createVenueAddressFeedback",
    validate: (address) => address.length <= 120 && address.length > 0,
    errorMessage: "Required, up to 120 characters max.",
  },
  {
    id: "createVenueCity",
    feedbackId: "createVenueCityFeedback",
    validate: (city) => city.length <= 50 && city.length > 0,
    errorMessage: "Required, up to 50 characters max.",
  },
  {
    id: "createVenueZip",
    feedbackId: "createVenueZipFeedback",
    validate: (zip) => zip.length <= 10 && zip.length > 0,
    errorMessage: "Required, up to 10 characters max.",
  },
  {
    id: "createVenueCountry",
    feedbackId: "createVenueCountryFeedback",
    validate: (country) => country.length <= 50 && country.length > 0,
    errorMessage: "Required, up to 50 characters max.",
  },
  {
    id: "createVenueContinent",
    feedbackId: "createVenueContinentFeedback",
    validate: (continent) => continent.length <= 50 && continent.length > 0,
    errorMessage: "Required, up to 50 characters max.",
  },
  {
    id: "createVenueLat",
    feedbackId: "createVenueLatFeedback",
    validate: (lat) => {
      lat = Number(lat);
      return typeof lat === "number" && lat <= 90 && lat >= -90;
    },
    errorMessage: "Must be a number between -90 and 90.",
  },
  {
    id: "createVenueLng",
    feedbackId: "createVenueLngFeedback",
    validate: (lng) => {
      lng = Number(lng);
      return typeof lng === "number" && lng <= 180 && lng >= -180;
    },
    errorMessage: "Must be a number between -180 and 180.",
  },
];
