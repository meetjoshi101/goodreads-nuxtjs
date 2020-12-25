<template>
  <div class="col">
    <div class="card">
      <h5 class="card-header">
        {{ data.read[0].book_id }}
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
  methods: {
    editReview () {
      console.log('edit' + this.data.id)
    },
    deleteReview () {
      console.log('delete' + this.data.id)
    }
  }
}
</script>
