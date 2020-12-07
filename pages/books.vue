<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="isbnState"
          label="ISBN"
          label-for="ISBN-input"
          invalid-feedback="ISBN is required"
        >
          <b-form-input
            id="ISBN-input"
            v-model="isbn"
            :state="isbnState"
            required
          />
          <b-form-group
            :state="titleState"
            label="Title"
            label-for="title-input"
            invalid-feedback="Title is required"
          >
            <b-form-input
              id="title-input"
              v-model="title"
              :state="titleState"
              required
            />
          </b-form-group>
        </b-form-group>
      </form>
    </b-modal>
    <div class="float-right mb-2">
      <b-button v-b-modal.modal-prevent-closing size="lg" variant="info">
        Add Book
      </b-button>
    </div>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(Utility)="data">
        <b-button-group>
          <b-button variant="info" @click="edit(data.item.ISBN)">
            Edit
          </b-button>
          <b-button variant="danger" @click="Delete(data.item.ISBN)">
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
export default {
  data () {
    return {
      fields: [
        { key: 'Name', lable: 'Book Name' },
        'Author',
        'ISBN',
        'Rating',
        'Utility'
      ],
      items: [
        {
          Name: 'Meet Book1',
          Author: 'Meet',
          ISBN: '1234567',
          Rating: 5
        }
      ],
      isbnState: null,
      submittedIsbn: null,
      isbn: null,
      title: null,
      titleState: null
    }
  },
  methods: {
    edit (ISBN) {
      // eslint-disable-next-line no-console
      console.log(ISBN)
    },
    Delete (ISBN) {
      console.log(ISBN)
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      this.isbnState = valid
      return valid
    },
    resetModal () {
      this.isbn = ''
      this.isbnState = null
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
      this.submittedIsbn = this.isbn
      console.log(this.submittedIsbn)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>

<style></style>
