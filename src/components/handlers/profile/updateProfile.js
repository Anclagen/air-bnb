import { getSession, setSession } from "../session/session.js";
import { validateForm } from "../../form/validation/validateForm.js";
import { errorFeedback } from "../../form/feedback/errorFeedback.js";
import { updateProfile } from "../../api/profile/update.js";
import { validateUrl } from "../../form/validation/validateUrl.js";

function updateProfileModal(user) {
  const bio = $("#profileUpdateBio");
  bio.val(user.bio);
  const avatarUrl = $("#profileUpdateAvatarUrl");
  avatarUrl.val(user.avatar.url);
  const avatarAlt = $("#profileUpdateAvatarAlt");
  avatarAlt.val(user.avatar.alt);
  const bannerUrl = $("#profileUpdateBannerUrl");
  bannerUrl.val(user.banner.url);
  const bannerAlt = $("#profileUpdateBannerAlt");
  bannerAlt.val(user.banner.alt);
}

export async function updateProfileFormHandler() {
  try {
    const form = $("#profileUpdateForm");

    const user = getSession();
    console.log(user);
    updateProfileModal(user);
    form.on("submit", async (event) => {
      event.preventDefault();

      const bio = $("#profileUpdateBio");
      const avatarUrl = $("#profileUpdateAvatarUrl");
      const avatarAlt = $("#profileUpdateAvatarAlt");
      const bannerUrl = $("#profileUpdateBannerUrl");
      const bannerAlt = $("#profileUpdateBannerAlt");

      const isValid = validateForm(schema);

      if (!isValid) {
        return;
      }
      console.log(bio.val(), avatarUrl.val(), avatarAlt.val(), bannerUrl.val(), bannerAlt.val());
      const response = await updateProfile(bio.val(), avatarUrl.val(), avatarAlt.val(), bannerUrl.val(), bannerAlt.val());
      console.log(response);
      if (response.error) {
        $("#profileUpdateFormError").html(errorFeedback(response.error[0].message));
        return;
      }

      user.bio = response.data.bio;
      user.avatar.url = response.data.avatar.url;
      user.avatar.alt = response.data.avatar.alt;
      user.banner.url = response.data.banner.url;
      user.banner.alt = response.data.banner.alt;

      setSession(user);
      $("#profileUpdateModal").modal("hide");
      updateProfileModal(user);
      $("#userBio").text(user.bio);
      $("#userAvatar").attr("src", user.avatar.url);
      $("#userAvatar").attr("alt", user.avatar.alt);
      $("#userBanner").attr("src", user.banner.url);
      $("#userBanner").attr("alt", user.banner.alt);
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}

const schema = [
  {
    id: "profileUpdateBio",
    feedbackId: "profileUpdateBioFeedback",
    validate: (bio) => bio.length <= 160,
    errorMessage: "Bio must be less than 160 characters.",
  },
  {
    id: "profileUpdateAvatarUrl",
    feedbackId: "profileUpdateAvatarUrlFeedback",
    validate: (avatarUrl) => !avatarUrl || validateUrl(avatarUrl),
    errorMessage: "Invalid URL.",
  },
  {
    id: "profileUpdateAvatarAlt",
    feedbackId: "profileUpdateAvatarAltFeedback",
    validate: (avatarAlt) => avatarAlt.length <= 120,
    errorMessage: "Alt text must be less than 120 characters.",
  },
  {
    id: "profileUpdateBannerUrl",
    feedbackId: "profileUpdateBannerUrlFeedback",
    validate: (bannerUrl) => !bannerUrl || validateUrl(bannerUrl),
    errorMessage: "Invalid URL.",
  },
  {
    id: "profileUpdateBannerAlt",
    feedbackId: "profileUpdateBannerAltFeedback",
    validate: (bannerAlt) => bannerAlt.length <= 120,
    errorMessage: "Alt text must be less than 120 characters.",
  },
];
