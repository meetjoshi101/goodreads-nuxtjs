<template>
  <div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <nuxt-link v-for="book in books" :key="book.id" :to="'/book/'+book.ISBN" class="col mb-4">
        <the-book-card
          :image-src="book.Image_url"
          :title="book.Title"
          :author="book.Author"
          :rating="book.AvgRating"
        />
      </nuxt-link>
    </div>
    <b-button-group v-if="isSearch">
      <b-button variant="dark" @click="prev">
        Prev
      </b-button>
      <b-button variant="success" @click="next">
        Next
      </b-button>
    </b-button-group>
  </div>
</template>

<script>
import TheBookCard from '~/components/TheBookCard.vue'
/* eslint-disable no-console */
export default {
  components: { TheBookCard },
  layout: 'users',
  watchQuery: true,
  async asyncData ({ store, route, $router }) {
    await store.dispatch('fetchGenres')
    if (route.query.search) {
      await store.dispatch('fetchBooks', { search: route.query.search })
    } else {
      const page = route.query.page || 1
      const limit = route.query.limit || 9
      const genre = route.params.genre || 1
      const argsObj = {
        page,
        limit,
        genre
      }
      await store.dispatch('fetchBookByGenre', argsObj)
    }
  },
  data () {
    return {
      page: this.$route.query.page ? this.$route.query.page : 1,
      limit: this.$route.query.limit ? this.$route.query.limit : 9,
      isSearch: !this.$route.query.search
    }
  },
  computed: {
    books () {
      return this.$store.getters.getBooks()
    }
  },
  methods: {
    next () {
      this.page++
      this.$router.push(`?page=${this.page}&limit=${this.limit}`)
    },
    prev () {
      if (this.page > 1) {
        this.page--
        this.$router.push(`?page=${this.page}&limit=${this.limit}`)
      }
    }
  }
}
</script>
