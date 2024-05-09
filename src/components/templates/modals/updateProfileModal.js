export function updateProfileModal(user) {
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
