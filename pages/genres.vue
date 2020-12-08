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
          :state="nameState"
          label="Genre Name"
          label-for="genre-input"
          invalid-feedback="Genre is required"
        >
          <b-form-input
            id="genre-input"
            v-model="name"
            :state="nameState"
            required
          />
        </b-form-group>
      </form>
    </b-modal>
    <div class="float-right mb-2">
      <b-button v-b-modal.modal-scrollable size="lg" variant="info">
        Add Genre
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
      fields: [
        { key: 'Name', lable: 'Genre Name' },
        'Utility'
      ],
      items: [
        {
          Name: 'Art'
        }
      ],
      nameState: null,
      name: null
    }
  },
  methods: {
    edit (name) {
      // eslint-disable-next-line no-console
      console.log(name)
    },
    Delete (name) {
      console.log(name)
    },
    addGenre () {
      console.log('add Genre')
    },
    checkFormValidity () {
      let valid = true
      if (this.name == '') {
        this.nameState = false
        valid = false
      } else {
        this.nameState = true
        valid = true
      }
      return valid
    },
    resetModal () {
      this.name = ''
      this.nameState = null
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
      this.addGenre()
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-scrollable')
      })
    }
  }
}
</script>
