<template>
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" >
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" style="height : 900px;" >
      <div class="carousel-item active" >
        <img class="d-block w-100" src="https://images.unsplash.com/photo-1568036830486-b4906a2954f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"  alt="First slide" />
      </div>
      <div class="carousel-item" >
        <img class="d-block w-100" src="https://images.unsplash.com/photo-1568648100713-100704ced8d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80"  alt="Second slide" />
      </div>
      <div class="carousel-item" >
        <img class="d-block w-100" src="https://images.unsplash.com/photo-1568036830486-b4906a2954f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Third slide" />
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselExampleIndicators"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselExampleIndicators"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>