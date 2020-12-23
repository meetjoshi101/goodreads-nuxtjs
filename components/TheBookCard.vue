<template>
  <div>
    <div class="card mb-3 shadow-sm">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="imageSrc" alt="Book Image">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{ title }}
            </h5>
            <p class="card-text author">
              {{ author }}
            </p>
            <p class="card-text rating">
              <small class="text-muted">{{ rating }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      default: 'https://images.gr-assets.com/books/1447303603m/2767052.jpg',
      required: true
    },
    title: {
      type: String,
      default: 'Unknown Title',
      required: true
    },
    author: {
      type: String,
      default: 'unknown Author',
      required: true
    },
    rating: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style scoped>
.card{
  max-width: 20rem;
  color: black;
}
.card-title{
  font-size: 0.8rem;
  font-weight: bold;
}
.card-img-top{
  max-height: 15rem;
}
.author{
  font-size: 0.7rem;
  color: black;
  text-decoration: none;
}
.rating{
  font-size: 0.7rem;
  color: gray;
}
</style>
