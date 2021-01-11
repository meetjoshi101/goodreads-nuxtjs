<template>
  <div>
    <div v-if="books.length !== 0" class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
      <nuxt-link v-for="book in books" :key="book.id" :to="'/book/'+book.ISBN" class="col mb-4">
        <TheBookcard
          :image-src="book.Image_url"
          :title="book.Title"
          :author="book.Author"
          :rating="book.AvgRating"
        />
      </nuxt-link>
    </div>
    <div v-if="books.length === 0">
      No Books
      <nuxt-link to="/">
        <b-button variant="success">
          Go to Home
        </b-button>
      </nuxt-link>
    </div>
    <b-button-group v-if="books.length !== 0">
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
export default {
  layout: 'users',
  watchQuery: true,
  components: {
    TheBookcard
  },
  async asyncData ({ store, route, $router }) {
    const queryObj = {
      page: route.query.page || 1,
      limit: route.query.limit || 9
    }
    await store.dispatch('fetchGenres')
    if (route.query.search) {
      queryObj.search = route.query.search
    }
    await store.dispatch('fetchBooks', queryObj)
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
