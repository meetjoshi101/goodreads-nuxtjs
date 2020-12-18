<template>
  <div>
    <b-modal
      id="modal-scrollable"
      ref="modal"
      title="Add Admin"
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
          <b-button variant="danger" @click="Delete(data.item.email)">
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
  middleware: ['authanticated'],
  data () {
    return {
      fields: ['email', 'name', 'role', 'Utility'],
      items: [],
      emailState: null,
      email: null
    }
  },
  created () {
    this.$axios.setToken(this.$store.state.Auth.token, 'Bearer')
    this.getUser()
  },
  methods: {
    getUser () {
      this.$axios.$get('/user/users').then(
        (res) => {
          this.items = res.Users
        },
        (err) => {
          console.log(err)
        }
      )
    },
    Delete (email) {
      this.$axios.$delete(`/user/${email}`).then((res) => {
        console.log(res)
        this.getUser()
      }, (err) => {
        console.log(err)
      })
    },
    addAdmin () {
      // eslint-disable-next-line quotes
      this.$axios.$patch(`/user/admin-user/${this.email}`).then((res) => {
        console.log(res)
        this.getUser()
      }, (err) => {
        console.log(err)
      })
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
