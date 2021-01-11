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
export default {
  components: { TheBookCard },
  layout: 'users',
  watchQuery: true,
  async asyncData ({ store, route, $router }) {
    await store.dispatch('fetchGenres')
    const page = route.query.page || 1
    const limit = route.query.limit || 9
    const query = {
      page,
      limit
    }
    if (route.query.search) {
      query.search = route.query.search
      await store.dispatch('fetchBooks', query)
    } else {
      query.genre = route.params.genre || 1
      await store.dispatch('fetchBookByGenre', query)
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
      const query = {
        page: this.page,
        limit: this.limit
      }
      if (this.$route.query.search) {
        query.search = this.$route.query.search
      }
      this.$router.push({ name: this.$route.name, query })
    },
    prev () {
      if (this.page > 1) {
        this.page--
        const query = {
          page: this.page,
          limit: this.limit
        }
        if (this.$route.query.search) {
          query.search = this.$route.query.search
        }
        this.$router.push({ name: this.$route.name, query })
      }
    }
  }
}
</script>
