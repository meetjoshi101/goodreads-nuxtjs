<template>
  <div class="row row-cols-md-3 g-0 mx-5 my-2">
    <review v-for="review in data" :key="review.id" :data="review" />
  </div>
</template>

<script>
import review from '~/components/user/review/review'
/* eslint-disable no-console */
export default {
  components: { review },
  layout: 'booklayout',
  async asyncData ({ store }) {
    await store.dispatch('fetchUserReview')
  },
  computed: {
    data () {
      return this.$store.getters.getUserReview()
    }
  }
}
</script>

<style>

</style>
