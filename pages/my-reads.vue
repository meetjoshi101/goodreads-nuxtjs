<template>
  <div class="row row-col-md-2">
    <div v-for="read in data" :key="read.id">
      <read-component :read="read" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'booklayout',
  watchQuery: true,
  async asyncData ({ store }) {
    await store.dispatch('fetchReads')
    store.state.reads.forEach(async (read) => {
      await store.dispatch('fetchReadsBookData', read)
    })
  },
  computed: {
    data () {
      return this.$store.getters.getReadsBookData()
    }
  }
}
</script>

<style>

</style>
