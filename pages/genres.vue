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
          <b-button
            v-b-modal.modal-scrollable
            variant="info"
            @click="edit(data.item.id)"
          >
            Edit
          </b-button>
          <b-button variant="danger" @click="Delete(data.item.id)">
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
/* eslint-disable quotes */
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
  middleware: ['authanticated'],
  data () {
    return {
      fields: [{ key: "name", lable: "Genre Name" }, "Utility"],
      items: [],
      nameState: null,
      name: null,
      isEdit: false,
      editId: null
    }
  },
  created () {
    this.$axios.setToken(this.$store.state.Auth.token, "Bearer")
    this.$axios.$get("/genre").then(
      (res) => {
        this.items = res.genres
        this.items.sort((book1, book2) => {
          return compareObjects(book1, book2, "name")
        })
      },
      (err) => {
        console.log(err)
      }
    )
  },
  methods: {
    getGenres () {
      this.$axios.$get("/genre").then(
        (res) => {
          this.items = res.genres
          this.items.sort((book1, book2) => {
            return compareObjects(book1, book2, "name")
          })
        },
        (err) => {
          console.log(err)
        }
      )
    },
    edit (id) {
      this.isEdit = true
      this.editId = id
    },
    Delete (id) {
      this.$axios.$delete(`/genre/delete/${id}`).then(
        (res) => {
          this.items = this.items.filter(i => i.id != id)
        },
        (err) => {
          console.log(err)
        }
      )
    },
    editGenre () {
      this.$axios.$patch(`/genre/edit-genre/${this.editId}`, {
        name: this.name
      }).then((res) => {
        this.getGenres()
      }, (err) => {
        console.log(err)
      })
      this.isEdit = false
    },
    addGenre () {
      this.$axios
        .$post("/genre/add-genre", {
          name: this.name
        })
        .then(
          (res) => {
            this.items.push(res.genre)
          },
          (err) => {
            console.log(err)
          }
        )
    },
    checkFormValidity () {
      let valid = true
      if (this.name == "") {
        this.nameState = false
        valid = false
      } else {
        this.nameState = true
        valid = true
      }
      return valid
    },
    resetModal () {
      this.name = ""
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
      if (this.isEdit) {
        this.editGenre()
      } else {
        this.addGenre()
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-scrollable")
      })
    }
  }
}
</script>
