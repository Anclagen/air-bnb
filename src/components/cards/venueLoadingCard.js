export function venueLoadingCard() {
  return $(`
  <div class="col-sm-6 col-md-4 col-xl-3 d-flex align-items-stretch rounded  overflow-hidden">
  <div class="card m-2 w-100">
    <div class="card-img-top placeholder-glow">
      <span class="placeholder" style="width:100%; height: 200px;"></span>
    </div>
    <div class="card-body">
      <h5 class="card-title placeholder-glow">
        <span class="placeholder col-6"></span>
      </h5>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-7"></span>
      </p>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-4"></span>
      </p>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-4"></span>
      </p>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-4"></span>
      </p>
      <p class="card-text placeholder-glow">
        <span class="placeholder col-4"></span>
      </p>
      <button class="btn btn-primary p-2 px-3 ms-2" disabled>view</button>
    </div>
  </div>
</div>
  `);
}
