<template>
  <div class="row row-cols-md-3 g-0 mx-5 my-2">
    <b-modal
      id="delete-modal"
      ref="delete-modal"
      title="Sure Delete Review"
      @ok="DeleteOk"
    >
      Sure Delete Review ?
    </b-modal>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Edit Your Review"
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
    <review
      v-for="review in reviews"
      :key="review.id"
      :data="review"
      @edit="editReview"
      @delete="deleteReview"
    />
  </div>
</template>

<script>
import review from '~/components/user/review/review'
/* eslint-disable no-console */
export default {
  components: { review },
  middleware: ['authanticated'],
  layout: 'booklayout',
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
      reviewId: null,
      deleteId: null
    }
  },
  computed: {
    reviews () {
      return this.$store.getters.getUserReview()
    }
  },
  methods: {
    editReview (id) {
      this.reviewId = id
      console.log('edit: ' + this.reviewId)
      this.$refs.modal.show()
    },
    deleteReview (id) {
      this.deleteId = id
      this.$refs['delete-modal'].show()
    },
    DeleteOk () {
      this.$store.dispatch('deleteReview', this.deleteId)
    },
    resetModal () {
      const review = this.reviews.filter(review => review.id === this.reviewId)
      this.commentState = true
      this.comment = review[0].comment
      this.rating = review[0].rating
      this.ratingState = true
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
        id: this.reviewId,
        rating: this.rating,
        comment: this.comment
      }
      this.$store.dispatch('editReview', review)
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>

<style></style>
