<template>
  <div class="col">
    <div class="card">
      <h5 class="card-header">
        {{ title }}
      </h5>
      <div class="card-body">
        <h5 class="card-title">
          {{ data.comment }}
        </h5>
        <p class="card-text">
          {{ data.rating }}
        </p>
        <footer class="blockquote-footer">
          {{ data.date.slice(0, 10) }}
        </footer>
        <b-button-group class="float-right">
          <b-button variant="dark" @click="editReview">
            Edit
          </b-button>
          <b-button variant="danger" @click="deleteReview">
            Delete
          </b-button>
        </b-button-group>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
export default {
  props: {
    data: {
      type: Object,
      default: null,
      required: true
    }
  },
  computed: {
    title () {
      const bookData = this.$store.getters.getReadsBookData()
      const book = bookData.filter(book => book.id === this.data.read[0].id)
      if (book[0]) {
        return book[0].Title
      } else {
        return 'Book Title'
      }
    }
  },
  methods: {
    editReview () {
      console.log('edit: ' + this.data.id)
      this.$emit('edit', this.data.id)
    },
    deleteReview () {
      this.$emit('delete', this.data.id)
    }
  }
}
</script>
