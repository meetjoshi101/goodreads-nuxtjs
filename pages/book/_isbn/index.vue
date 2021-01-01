<template>
  <div class="d-flex justify-content-center">
    <div class="d-flex my-4">
      <book-image :image-url="book.Image_url" />
      <div class="d-flex flex-column">
        <book-details :book="book" :genre="genre" :is-read="isread" />
        <div class="mt-5 pl-3 d-flex flex-column">
          <div class="h3">
            Reviews<span class="ml-2 badge rounded-pill bg-success text-light">{{ count }}</span>
          </div>
          <div class="h6 mt-3">
            <bookReview v-for="review in reviews" :key="review.id" :review="review" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
import bookReview from '../../../components/user/singleBook/bookReview'
export default {
  components: {
    bookReview
  },
  watchQuery: true,
  layout: 'booklayout',
  async asyncData ({ store, route }) {
    // eslint-disable-next-line no-console
    await store.dispatch('fetchReads')
    await store.dispatch('fetchBookByIsbn', route.params.isbn)
    const book = store.getters.getBook()
    await store.dispatch('fetchBookReviews', book.id)
  },
  computed: {
    book () {
      return this.$store.getters.getBook()
    },
    genre () {
      return this.$store.getters.getGenre()
    },
    reviews () {
      return this.$store.getters.getBookReview()
    },
    count () {
      return this.$store.getters.getBookReviewCount()
    },
    isread () {
      const read = this.$store.getters.getReads()
      let isRead = false
      read.forEach((obj) => {
        // eslint-disable-next-line eqeqeq
        if (obj.book_id == this.book.id) {
          isRead = true
        }
      })
      return isRead
    }
  }
}
</script>

<style scoped>
.reviews {
  min-width: 50vw;
}
</style>
