<template>
  <div>
    <div class="h3 py-2 text-center">
      My Reads
    </div>
    <div class="row row-col-2 m-4">
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Submit Your Review"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            label="Comment"
            label-for="comment-input"
            invalid-feedback="comment is required"
            :state="commentState"
          >
            <b-form-input
              id="comment-input"
              v-model="comment"
              placeholder="Enter your comment"
              :state="commentState"
              required
            />
          </b-form-group>
          <b-form-group
            label="Rating"
            label-for="rating-input"
          >
            <b-form-rating id="rating-input" v-model="rating" variant="primary" class="mb-2" />
          </b-form-group>
        </form>
      </b-modal>
      <div v-for="read in readBook" :key="read.id" class="mb-4">
        <read-component :read="read" @add-review="addReview" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  layout: 'booklayout',
  middleware: ['authanticated'],
  watchQuery: true,
  async asyncData ({ store }) {
    await store.dispatch('fetchUserReview')
    await store.dispatch('fetchReads')
  },
  data () {
    return {
      comment: '',
      commentState: null,
      rating: 1,
      readId: null
    }
  },
  computed: {
    readBook () {
      return this.$store.getters.getReads()
    }
  },
  methods: {
    addReview (id) {
      this.readId = id
      this.$refs.modal.show()
    },
    resetModal () {
      this.commentState = null
      this.comment = ''
      this.rating = 1
      this.ratingState = null
    },
    validate () {
      let validate = false
      if (!this.comment) {
        this.commentState = false
        validate = false
      } else {
        this.commentState = true
        validate = true
      }
      if (!this.rating || this.rating > 5 || this.rating < 1) {
        this.rating = 1
      }
      return validate
    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.validate()) {
        this.reviewSubmit()
      }
    },
    reviewSubmit () {
      const review = {
        rating: this.rating,
        comment: this.comment,
        id: this.readId
      }
      this.$store.dispatch('addReview', review).then(async () => {
        await this.$store.dispatch('fetchUserReview')
      })
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>
