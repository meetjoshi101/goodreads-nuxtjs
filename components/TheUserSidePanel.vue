<template>
  <div class="shadow mb-5 bg-white rounded">
    <div class="text-center border-bottom py-2 genre-colour">
      Genres
    </div>
    <div>
      <nuxt-link
        v-for="genre in Genres"
        :key="genre.id"
        to="genre"
        class="link-colour d-flex border-bottom"
      >
        <div class="mx-2 my-2">
          {{ genre.name }}
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('fetchGenres')
  },
  data () {
    return {
      Genres: this.$store.getters.getGenres()
    }
  }
}
</script>
<style>
.link-colour {
  color: #379164;
  font-weight: 200;
}
a.nuxt-link-exact-active {
  color: #2ebdff;
  font-weight: 200;
  text-decoration: none;
}
.link-colour:hover {
  color: rgb(130, 85, 255);
  text-decoration: none;
}
.genre-colour{
  color: rgb(61, 61, 61);
}
</style>
