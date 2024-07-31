import $ from "jquery";

export async function SearchModal() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const form = $(".searchModalForm");
  form.on("submit", function (e) {
    e.preventDefault();
    const formData = form.serializeArray();
    const search = formData[0].value;
    console.log(search);
    //clear search input
    form.trigger("reset");
  });
}
