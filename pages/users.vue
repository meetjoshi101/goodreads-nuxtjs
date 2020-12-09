<template>
  <div>
    <b-modal
      id="modal-scrollable"
      ref="modal"
      title="Add Books"
      scrollable
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form
        ref="form"
        title="Scrollable Content"
        @submit.stop.prevent="handleSubmit"
      >
        <b-form-group
          :state="emailState"
          label="Email"
          label-for="email-input"
          invalid-feedback="email is required"
        >
          <b-form-input
            id="email-input"
            v-model="email"
            :state="emailState"
            required
          />
        </b-form-group>
      </form>
    </b-modal>
    <div class="float-right mb-2">
      <b-button v-b-modal.modal-scrollable size="lg" variant="info">
        Add Admin
      </b-button>
    </div>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(Utility)="data">
        <b-button-group>
          <b-button variant="info" @click="edit(data.item.Name)">
            Edit
          </b-button>
          <b-button variant="danger" @click="Delete(data.item.Name)">
            Delete
          </b-button>
        </b-button-group>
      </template>
    </b-table>
  </div>
</template>

<script>
/* eslint-disable no-labels */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
export default {
  data () {
    return {
      fields: ['Email'],
      items: [
        {
          Email: 'meet@gmail.com'
        }
      ],
      emailState: null,
      email: null
    }
  },
  methods: {
    edit (email) {
      // eslint-disable-next-line no-console
      console.log(email)
    },
    Delete (email) {
      console.log(email)
    },
    addAdmin () {
      console.log('add Genre')
    },
    checkFormValidity () {
      let valid = true
      if (this.email == '') {
        this.emailState = false
        valid = false
      } else {
        this.emailState = true
        valid = true
      }
      return valid
    },
    resetModal () {
      this.email = ''
      this.emailState = null
    },
    handleOk (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit () {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.addAdmin()
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-scrollable')
      })
    }
  }
}
</script>
