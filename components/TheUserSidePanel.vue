<template>
  <div class="shadow mb-5 bg-white rounded">
    <h5 class="text-center border-bottom pb-2 ">
      Genres
    </h5>
    <nuxt-link
      v-for="(genre, index) in Genres"
      :key="index"
      to="genre"
    >
      <div id="link" class="border-bottom py-2 text-center font-color">
        {{ genre }}
      </div>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
      Genres: ['Art', 'Scince', 'Math', 'Fiction', 'Love', 'Action']
    }
  }
}
</script>
<style>

</style>
