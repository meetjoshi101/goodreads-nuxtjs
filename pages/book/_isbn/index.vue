<template>
  <div>
    <div class="d-flex my-4">
      <book-image :image-url="book.Image_url" />
      <book-details :book="book" :genre="genre" />
    </div>
  </div>
</template>

<script>
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
    }
  }
}
</script>
