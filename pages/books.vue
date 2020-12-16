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
          v-if="!isEdit"
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
        <b-dropdown id="dropdown-1" :text="selectedGenre" class="m-md-2">
          <b-dropdown-item v-for="genre in genres" :key="genre.id" @click="selectGenre(genre.id, genre.name)">
            {{ genre.name }}
          </b-dropdown-item>
        </b-dropdown>
      </form>
    </b-modal>
    <div class="d-flex justify-content-end mb-2">
      <b-form-input v-model="s" size="sm" class="mr-sm-2" style="max-width: 20vw;" placeholder="Search" />
      <b-button size="sm" class="my-2 my-sm-0 mx-2" @click="search">
        Search
      </b-button>
    </div>
    <div class="float-right mb-2">
      <b-button v-b-modal.modal-scrollable variant="info">
        Add Book
      </b-button>
    </div>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(Utility)="data">
        <b-button-group>
          <b-button v-b-modal.modal-scrollable variant="info" @click="edit(data.item.ISBN)">
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

const compareObjects = (object1, object2, key) => {
  const obj1 = object1[key].toUpperCase()
  const obj2 = object2[key].toUpperCase()

  if (obj1 < obj2) {
    return -1
  }
  if (obj1 > obj2) {
    return 1
  }
  return 0
}

export default {
  layout: 'default',
  middleware: ['authanticated'],
  data () {
    return {
      fields: [
        { key: 'Title', lable: 'Book Name' },
        'Author',
        'ISBN',
        { key: 'AvgRating', lable: 'Rating' },
        'Utility'
      ],
      items: [],
      genres: [],
      selectedGenre: 'Art',
      selectedGenreId: 1,
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
      avgRating: 0,
      isEdit: false,
      editISBN: null,
      selectedBook: null,
      s: ''
    }
  },
  created () {
    this.$axios.setToken(this.$store.state.Auth.token, 'Bearer')
    this.$axios.$get('/book').then(
      (res) => {
        this.items = res.book
        this.$axios.$get('/genre').then(
          (res) => {
            this.genres = res.genres
            this.genres.sort((book1, book2) => {
              return compareObjects(book1, book2, 'name')
            })
          },
          (err) => {
            console.log(err)
          }
        )
      },
      (err) => {
        console.log(err)
      }
    )
  },
  methods: {
    search () {
      this.$axios.$post('/book/search', {
        s: this.s
      }).then((res) => {
        this.items = res.result
      }, (err) => {
        console.log(err)
      })
    },
    edit (ISBN) {
      // eslint-disable-next-line no-console
      console.log(ISBN)
      this.isEdit = true
      this.editISBN = ISBN
    },
    editBook () {
      const bookObj = {
        Gener_id: this.selectedGenreId,
        ISBN: this.editISBN,
        AvgRating: this.avgRating,
        Title: this.title,
        Author: this.author,
        Description: this.description,
        publication_Year: this.publicationYear,
        'image-url': 'http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg',
        'image-url-s': 'http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg'
      }
      this.$axios.$patch('/book/edit-book', bookObj).then((res) => {
        console.log(res)
      }, (err) => {
        console.log(err)
      })
      this.isEdit = false
    },
    Delete (ISBN) {
      this.$axios.$delete(`/book/delete/isbn/${ISBN}`).then((res) => {
        console.log(res)
      }, (err) => {
        console.log(err)
      })
    },
    addBook () {
      const bookObj = {
        Gener_id: this.selectedGenreId,
        ISBN: this.isbn,
        AvgRating: this.avgRating,
        Title: this.title,
        Author: this.author,
        Description: this.description,
        publication_Year: this.publicationYear,
        'image-url': 'http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg',
        'image-url-s': 'http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg'
      }
      this.$axios.$post('book/add-book', bookObj)
        .then((res) => {
          console.log(res)
        }, (err) => {
          console.log(err)
        })
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
      if (this.isEdit) {
        this.selectedBook = this.items.find(b => b.ISBN == this.editISBN)
        const seletctedGenre = this.genres.find(g => g.id == this.selectedBook.Gener_id)
        console.log(seletctedGenre.name)
        this.isbn = this.selectedBook.ISBN
        this.isbnState = true
        this.title = this.selectedBook.Title
        this.titleState = true
        this.description = 'HI Dis'
        this.descriptionState = true
        this.author = this.selectedBook.Author
        this.authorState = true
        this.publicationYear = this.selectedBook.publication_Year
        this.publicationYearState = true
        this.avgRating = this.selectedBook.AvgRating
        this.avgRatingState = true
        this.selectedGenre = seletctedGenre.name
        this.selectedGenreId = seletctedGenre.id
      } else {
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
        this.avgRating = 0
        this.avgRatingState = null
        this.selectedGenre = 'Art'
        this.selectedGenreId = 1
      }
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
      if (this.isEdit) {
        this.editBook()
      } else { this.addBook() }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-scrollable')
      })
    },
    selectGenre (id, name) {
      this.selectedGenre = name
      this.selectedGenreId = id
    }
  }
}
</script>

<style></style>
