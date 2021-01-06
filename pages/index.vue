<template>
  <div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <nuxt-link v-for="book in books" :key="book.id" :to="'/book/'+book.ISBN" class="col mb-4">
        <TheBookcard
          :image-src="book.Image_url"
          :title="book.Title"
          :author="book.Author"
          :rating="book.AvgRating"
        />
      </nuxt-link>
    </div>
    <b-button-group>
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
import TheBookcard from '../components/TheBookCard'
import queryGenerator from '../static/js/queryGenerator'
export default {
  layout: 'users',
  watchQuery: true,
  components: {
    TheBookcard
  },
  async asyncData ({ store, route, $router }) {
    const query = queryGenerator(route.query)
    // eslint-disable-next-line no-console
    console.log(query)
    await store.dispatch('fetchGenres')
    if (route.query.search) {
      await store.dispatch('fetchBooks', { search: route.query.search })
    } else {
      const page = route.query.page || 1
      const limit = route.query.limit || 9
      const pageLimitObj = {
        page,
        limit
      }
      await store.dispatch('fetchBooks', { pageLimitArg: pageLimitObj })
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
