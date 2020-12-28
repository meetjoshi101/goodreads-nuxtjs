<template>
  <div>
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
            :state="commentState"
            required
          />
          <b-form-group
            label="Rating"
            label-for="rating-input"
            invalid-feedback="rating is required"
            :state="ratingState"
          >
            <b-form-input
              id="rating-input"
              v-model="rating"
              :state="ratingState"
              required
            />
          </b-form-group>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable no-console */

export default {

  props: {
    isEdit: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      comment: '',
      commentState: null,
      rating: 0,
      ratingState: null
    }
  },
  methods: {
    resetModal () {
      this.commentState = null
      this.comment = ''
      this.rating = 0
      this.ratingState = null
    },
    handleOk () {
      console.log(this.comment)
    }
  }
}
</script>

<style>

</style>
