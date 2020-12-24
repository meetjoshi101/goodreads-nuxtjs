<template>
  <div>
    <div class="d-flex my-4">
      <book-image :image-url="book.Image_url" />
      <book-details :book="book" :genre="genre" :is-read="isread" />
    </div>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
export default {
  layout: 'booklayout',
  async asyncData ({ store, route }) {
    await store.dispatch('fetchBookByIsbn', route.params.isbn)
  },
  computed: {
    book () {
      return this.$store.getters.getBook()
    },
    genre () {
      return this.$store.getters.getGenre()
    },
    isread () {
      const read = this.$store.getters.getReads()
      let isRead = false
      read.forEach((obj) => {
        // eslint-disable-next-line no-console
        console.log(obj.book_id == this.book.id)
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
