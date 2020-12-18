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
  watchQuery: true,
  middleware: ['authanticated'],
  async asyncData ({ store }) {
    console.log('inside Asyncdata')
    await store.dispatch('fetchUsers')
  },
  data () {
    return {
      fields: ['email', 'name', 'role', 'Utility'],
      // items: this.$store.getters.getUsers(),
      emailState: null,
      email: null
    }
  },
  computed: {
    items () {
      return this.$store.getters.getUsers()
    }
  },
  created () {
    this.$store.dispatch('fetchUsers')
  },
  methods: {
    Delete (email) {
      this.$axios.$delete(`/user/${email}`).then((res) => {
        console.log(res)
      }, (err) => {
        console.log(err)
      })
    },
    addAdmin () {
      // eslint-disable-next-line quotes
      // this.$axios.$patch(`/user/admin-user/${this.email}`).then((res) => {
      //   console.log(res)
      // }, (err) => {
      //   console.log(err)
      // })
      this.$store.dispatch('addAdmin')
      this.$store.dispatch('fetchUsers')
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
