<template>
  <div class="row row-col-2 m-4">
    <div v-for="read in data" :key="read.id" class="mb-4">
      <read-component :read="read" />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  layout: 'booklayout',
  watchQuery: true,
  async asyncData ({ store }) {
    await store.dispatch('fetchReads')
    const reads = store.state.reads
    let reLoad = true
    for (let i = 0; i < reads.length; i++) {
      await store.dispatch('fetchReadsBookData', {
        read: reads[i],
        reLoad
      })
      reLoad = false
    }
  },
  computed: {
    data () {
      return this.$store.getters.getReadsBookData()
    }
  }
}
</script>
