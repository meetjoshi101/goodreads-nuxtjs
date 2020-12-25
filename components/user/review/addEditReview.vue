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
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
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
      commentState: null
    }
  }

}
</script>

<style>

</style>
