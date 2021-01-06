<template>
  <div>
    <b-modal id="askBookDelete" title="Delete" @ok="Delete()">
      <p>
        Want To Delete this Book?
      </p>
    </b-modal>
    <b-modal id="bookDeleted" title="Deleted" cancel-disabled>
      <p>
        Book Deleted
      </p>
    </b-modal>
    <b-modal id="bookAdded" title="Added">
      <p>
        Book Added
      </p>
    </b-modal>
    <b-modal id="bookEdited" title="Edited">
      <p>
        Book edited
      </p>
    </b-modal>
    <b-modal
      id="modal-scrollable"
      ref="modal"
      :title="isEdit ? 'Edit Book' : 'Add Book'"
      scrollable
      no-close-on-esc
      no-close-on-backdrop
      hide-header-close
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      @cancel="cancle"
    >
      <form
        ref="form"
        title="Scrollable Content"
        encrypt="multipart/form-data"
        @submit.stop.prevent="handleSubmit"
      >
        <div v-if="isEdit">
          <b-form-group
            :state="isbnState"
            label="ISBN"
            label-for="ISBN-input"
            invalid-feedback="ISBN is required"
          >
            <b-form-input id="ISBN-input" v-model="isbn" disabled />
          </b-form-group>
        </div>
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
          label="Average Rating"
          label-for="avgRating-input"
          invalid-feedback="Average Rating is required"
        >
          <b-form-input
            id="publicationYear-input"
            v-model="avgRating"
            :state="avgRatingState"
            type="number"
            required
          />
        </b-form-group>
        <b-form-file
          v-model="bookImage"
          :state="Boolean(bookImage)"
          placeholder="Drop book image here..."
          drop-placeholder="Drop image here..."
          accept="image/*"
        />
        <b-dropdown
          id="dropdown-1"
          :text="selectedGenre"
          dropup
          class="m-md-2 my-class"
        >
          <b-dropdown-item
            v-for="genre in genres"
            :key="genre.id"
            @click="selectGenre(genre.id, genre.name)"
          >
            {{ genre.name }}
          </b-dropdown-item>
        </b-dropdown>
      </form>
    </b-modal>
    <div class="d-flex justify-content-end mb-2">
      <b-icon
        v-if="s"
        icon="x-circle"
        style="height: 25px; width: 25px;"
        class="mr-2"
        variant="danger"
        @click="clearSearch"
      />
      <b-form-input
        v-model="s"
        size="sm"
        class="mr-sm-2"
        style="max-width: 20vw;"
        placeholder="Search"
      />
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
          <b-button
            v-b-modal.modal-scrollable
            variant="info"
            @click="edit(data.item.ISBN)"
          >
            Edit
          </b-button>
          <b-button
            v-b-modal.askBookDelete
            variant="danger"
            @click="selectDelete(data.item.ISBN)"
          >
            Delete
          </b-button>
        </b-button-group>
      </template>
    </b-table>
    <b-button-group>
      <b-button variant="dark" @click="prev">
        Prev
      </b-button>
      <b-button variant="success" @click="next">
        Next
      </b-button>
    </b-button-group>
  </div>
</template>

<script>
/* eslint-disable no-labels */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
export default {
  watchQuery: true,
  layout: 'default',
  middleware: ['adminAuthanticated'],
  async asyncData ({ store, route, $router }) {
    await store.dispatch('fetchGenres')
    const page = route.query.page || 1
    const limit = route.query.limit || 10
    const pageLimitObj = {
      page,
      limit
    }
    if (route.query.search) {
      await store.dispatch('fetchBooks', { search: route.query.search, page, limit })
    } else {
      await store.dispatch('fetchBooks', { pageLimitArg: pageLimitObj })
    }
  },
  data () {
    return {
      fields: [
        { key: 'Title', lable: 'Book Name' },
        'Author',
        'ISBN',
        { key: 'AvgRating', lable: 'Rating' },
        'Utility'
      ],
      page: this.$route.query.page ? this.$route.query.page : 1,
      limit: this.$route.query.limit ? this.$route.query.limit : 10,
      selectedGenre: 'Art',
      selectedGenreId: 1,
      isbnState: null,
      submittedIsbn: null,
      isbn: '',
      title: '',
      titleState: null,
      author: '',
      authorState: null,
      publicationYear: '',
      publicationYearState: null,
      avgRating: 1,
      avgRatingState: null,
      isEdit: false,
      editISBN: null,
      selectedBook: null,
      s: this.$route.query.search ? this.$route.query.search : '',
      selectDeleteIsbn: null,
      bookImage: ''
    }
  },
  computed: {
    genres () {
      return this.$store.getters.getGenres()
    },
    items () {
      return this.$store.getters.getBooks()
    }
  },
  methods: {
    clearSearch () {
      this.s = ''
      this.$router.push('/admin/books')
    },
    selectDelete (isbn) {
      this.selectDeleteIsbn = isbn
    },
    next () {
      this.page++
      let query
      console.log(this.$route)
      if (this.$route.query.search) {
        query = {
          page: this.page,
          limit: this.limit,
          search: this.$route.query.search
        }
      } else {
        query = {
          page: this.page,
          limit: this.limit
        }
      }
      this.$router.push({ name: this.$route.name, query })
    },
    prev () {
      if (this.page > 1) {
        this.page--
        let query
        if (this.$route.query.search) {
          query = {
            page: this.page,
            limit: this.limit,
            search: this.$route.query.search
          }
        } else {
          query = {
            page: this.page,
            limit: this.limit
          }
        }
        this.$router.push({ name: this.$route.name, query })
      }
    },
    cancle () {
      this.isEdit = false
    },
    search () {
      if (this.s) {
        this.$router.push(`/admin/books?search=${this.s}`)
        const args = {
          search: this.s,
          page: 1,
          limit: 10
        }
        this.$store.dispatch('fetchBooks', args)
      }
    },
    edit (ISBN) {
      this.isEdit = true
      this.editISBN = ISBN
    },
    async editBook () {
      const bookObj = {
        Gener_id: this.selectedGenreId,
        ISBN: this.editISBN,
        AvgRating: this.avgRating,
        Title: this.title,
        Author: this.author,
        publication_Year: this.publicationYear,
        Image_url:
          'http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg',
        Image_URL_S:
          'http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg'
      }
      await this.$store.dispatch('editBook', bookObj)
      this.$bvModal.show('bookEdited')
      if (this.$route.query.search) {
        this.$store.dispatch('fetchBooks', {
          search: this.$route.query.search
        })
      } else {
        const pageLimitObj = {
          page: this.page,
          limit: this.limit
        }
        this.$store.dispatch('fetchBooks', { pageLimitArg: pageLimitObj })
      }
      this.isEdit = false
    },
    async Delete () {
      await this.$store.dispatch('deleteBook', this.selectDeleteIsbn)
      this.$bvModal.show('bookDeleted')
      if (this.$route.query.search) {
        this.$store.dispatch('fetchBooks', {
          search: this.$route.query.search
        })
      } else {
        const pageLimitObj = {
          page: this.page,
          limit: this.limit
        }
        this.$store.dispatch('fetchBooks', { pageLimitArg: pageLimitObj })
      }
    },

    async addBook () {
      const bookObj = {
        Gener_id: this.selectedGenreId,
        ISBN: this.isbn,
        AvgRating: this.avgRating,
        Title: this.title,
        Author: this.author,
        publication_Year: this.publicationYear,
        Image_url:
          'http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg',
        Image_URL_S:
          'http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg'
      }
      await this.$store.dispatch('addBook', bookObj)
      this.$bvModal.show('bookAdded')
      if (this.$route.query.search) {
        this.$store.dispatch('fetchBooks', {
          search: this.$route.query.search
        })
      } else {
        const pageLimitObj = {
          page: this.page,
          limit: this.limit
        }
        this.$store.dispatch('fetchBooks', { pageLimitArg: pageLimitObj })
      }
    },
    checkFormValidity () {
      let valid = false
      if (this.isbn == '') {
        this.isbnState = false
      } else {
        this.isbnState = true
      }
      if (this.title == '') {
        this.titleState = false
      } else {
        this.titleState = true
      }
      if (this.author == '') {
        this.authorState = false
      } else {
        this.authorState = true
      }
      if (this.publicationYear == '' || this.publicationYear > 2021) {
        this.publicationYearState = false
      } else {
        this.publicationYearState = true
      }

      if (this.isbnState && this.titleState && this.authorState && this.publicationYearState) {
        valid = true
      } else {
        valid = false
      }

      return valid
    },
    resetModal () {
      if (this.isEdit) {
        this.selectedBook = this.$store.getters.getBookByIsbn(this.editISBN)
        const seletctedGenre = this.genres.find(
          g => g.id == this.selectedBook.Gener_id
        )
        this.isbn = this.selectedBook.ISBN
        this.isbnState = null
        this.title = this.selectedBook.Title
        this.titleState = true
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
        this.author = ''
        this.authorState = null
        this.publicationYear = ''
        this.publicationYearState = null
        this.avgRating = 1
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
      // if (!this.checkFormValidity()) {
      //   return
      // }
      // if (this.isEdit) {
      //   this.editBook()
      // } else {
      //   this.addBook()
      // }
      const formData = new FormData()
      formData.append('file', this.bookImage)
      try {
        this.$axios.$post('/upload', formData)
      } catch (e) {
        console.log(e)
      }
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

<style scoped>
.my-class /deep/ .dropdown-menu {
  max-height: 200px;
  overflow-y: auto;
}
</style>
