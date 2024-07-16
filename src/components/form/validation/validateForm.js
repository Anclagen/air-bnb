import { errorFeedback } from "../feedback/errorFeedback.js";
import $ from "jquery";

export function validateForm(fields) {
  let isValid = true;

  fields.forEach((field) => {
    const input = $(`#${field.id}`);
    const feedback = $(`#${field.feedbackId}`);

    if (!field.validate(input.val())) {
      feedback.html(errorFeedback(field.errorMessage));
      isValid = false;
    } else {
      feedback.html("");
    }
  });

  return isValid;
}
