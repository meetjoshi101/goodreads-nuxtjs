<template>
  <div>
    my reads {{ data }}
  </div>
</template>

<script>
export default {
  layout: 'booklayout',
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
