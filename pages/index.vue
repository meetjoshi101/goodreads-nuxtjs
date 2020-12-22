<template>
  <div>
    hi
  </div>
</template>

<script>
// import TheBookcard from '../components/TheBookCard'
/* <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
    <div class="col mb-2">
      <TheBookcard />
    </div>
  </div> */

export default {
  components: {
    // TheBookcard
  },
  async asyncData ({ store }) {
    await store.dispatch('fetchGenres')
  },
  layout: 'users'
}
</script>

<style >
</style>
