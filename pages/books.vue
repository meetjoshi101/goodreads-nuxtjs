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
        </b-form-group>
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
        <b-form-group
          :state="descriptionState"
          label="Description"
          label-for="textarea"
          invalid-feedback="Description is required"
        >
          <b-form-textarea
            id="textarea"
            v-model="description"
            placeholder="Enter description of books..."
            rows="3"
            max-rows="6"
            invalid-feedback="description is required"
            :state="publicationYearState"
            required
          />
        </b-form-group>
        <b-form-group
          :state="authorState"
          label="Author"
          label-for="author-input"
          invalid-feedback="Author is required"
        >
          <b-form-input
            id="author-input"
            v-model="author"
            :state="authorState"
            required
          />
        </b-form-group>
        <b-form-group
          :state="publicationYearState"
          label="Publication Year"
          label-for="publicationYear-input"
          invalid-feedback="publication Year is required"
        >
          <b-form-input
            id="publicationYear-input"
            v-model="publicationYear"
            :state="publicationYearState"
            type="number"
            required
          />
        </b-form-group>
        <b-form-group
          :state="avgRatingState"
          label="Average Rating"
          label-for="avgRating-input"
          invalid-feedback="Average Rating Year is required"
        >
          <b-form-input
            id="avgRating-input"
            v-model="avgRating"
            :state="avgRatingState"
            type="number"
            required
          />
        </b-form-group>
      </form>
    </b-modal>
    <div class="float-right mb-2">
      <b-button v-b-modal.modal-scrollable size="lg" variant="info">
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
/* eslint-disable eqeqeq */
export default {
  layout: 'default',
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
      isbn: '',
      title: '',
      titleState: null,
      description: '',
      descriptionState: null,
      author: '',
      authorState: null,
      publicationYear: '',
      publicationYearState: null,
      avgRatingState: null,
      avgRating: ''
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
    addBook () {
      console.log('add Books')
    },
    checkFormValidity () {
      let valid = true
      if (this.isbn == '') {
        this.isbnState = false
        valid = false
      } else if (this.title == '') {
        this.isbnState = true
        this.titleState = false
        valid = false
      } else if (this.description == '') {
        this.titleState = true
        this.descriptionState = false
        valid = false
      } else if (this.author == '') {
        this.descriptionState = true
        this.authorState = false
        valid = false
      } else if (this.publicationYear == '') {
        this.authorState = true
        this.publicationYearState = false
        valid = false
      } else if (this.avgRating == '') {
        this.avgRatingState = false
        valid = false
      } else {
        this.publicationYearState = true
        valid = true
      }
      return valid
    },
    resetModal () {
      this.isbn = ''
      this.isbnState = null
      this.title = ''
      this.titleState = null
      this.description = ''
      this.descriptionState = null
      this.author = ''
      this.authorState = null
      this.publicationYear = ''
      this.publicationYearState = null
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
      this.addBook()
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-scrollable')
      })
    }
  }
}
</script>

<style></style>
