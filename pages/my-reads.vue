<template>
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
          invalid-feedback="rating should be between 1 to 5"
          :state="ratingState"
        >
          <b-form-input
            id="rating-input"
            v-model="rating"
            type="number"
            placeholder="Enter Rating"
            :state="ratingState"
            required
          />
        </b-form-group>
      </form>
    </b-modal>
    <div v-for="read in readBook" :key="read.id" class="mb-4">
      <read-component :read="read" @add-review="addReview" />
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
    const reads = store.state.reads
    let reLoad = true
    for (let i = 0; i < reads.length; i++) {
      await store.dispatch('fetchReadsBookData', {
        read: reads[i],
        reLoad
      })
      reLoad = false
    }
  },
  data () {
    return {
      comment: '',
      commentState: null,
      rating: null,
      ratingState: null,
      readId: null
    }
  },
  computed: {
    readBook () {
      return this.$store.getters.getReadsBookData()
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
      this.rating = null
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
        this.ratingState = false
        validate = false
      } else {
        this.ratingState = true
        validate = true
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
      this.$store.dispatch('addReview', review)
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>
