<template>
  <div class="col">
    <div class="h4">
      {{ book.Title }}
    </div>
    <div class="h5">
      {{ book.Author }}
    </div>
    <div class="h6">
      ISBN {{ book.ISBN }}
    </div>
    <div class="h6">
      {{ book.publication_Year }}
    </div>
    <div class="h5 text-secondary d-flex">
      {{ book.AvgRating }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-star-fill ml-2"
        viewBox="0 0 16 16"
      >
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>
    </div>
    <div class="button-margin">
      <b-button v-if="isLogin" class="start-read-button" @click="addRead">
        Start Reading
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      default: null,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      isReadComplete: false
    }
  },
  computed: {
    isLogin () {
      if (this.$store.state.Auth.token && !this.isRead && !this.isReadComplete) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addRead () {
      this.$store.dispatch('addRead', this.book.id).then(() => {
        this.isReadComplete = true
      })
    }
  }
}
</script>

<style scoped>
.button-margin{
  margin-top: 6vh;
}
.start-read-button{
  color: #20ce88;
  font-weight: bold;
  background-color: white;
  border-color: #20ce88;
}
</style>
