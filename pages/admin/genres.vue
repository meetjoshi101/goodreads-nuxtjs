<template>
  <div>
    <b-modal
      id="askDelete"
      title="Delete"
      @ok="Delete()"
    >
      <p>
        Are You Sure To Delete genre?
      </p>
    </b-modal>
    <b-modal
      id="deleteOk"
      title="Deleted"
    >
      <p>
        Genre Deleted
      </p>
    </b-modal>
    <b-modal
      id="genreAdded"
      title="Added"
    >
      <p>
        Genre Added
      </p>
    </b-modal>
    <b-modal
      id="genreEdited"
      title="Edited"
    >
      <p>
        Genre edited
      </p>
    </b-modal>
    <b-modal
      id="modal-scrollable"
      ref="modal"
      :title="isEdit ? 'Edit' : 'Add'"
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
          <b-button v-b-modal.askDelete variant="danger" @click="selectDelete(data.item.id)">
            Delete
          </b-button>
        </b-button-group>
      </template>
    </b-table>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
/* eslint-disable quotes */

export default {
  middleware: ['authanticated'],
  async asyncData ({ store }) {
    await store.dispatch('fetchGenres')
  },
  data () {
    return {
      fields: [{ key: "name", lable: "Genre Name" }, "Utility"],
      nameState: null,
      name: null,
      isEdit: false,
      editId: null,
      deleteId: null
    }
  },
  computed: {
    items () {
      return this.$store.getters.getGenres()
    }
  },
  methods: {
    selectDelete (id) {
      this.deleteId = id
    },
    cancle () {
      this.isEdit = false
    },
    edit (id) {
      this.isEdit = true
      this.editId = id
    },
    async Delete () {
      await this.$store.dispatch('deleteGenre', this.deleteId)
      this.$bvModal.show('deleteOk')
    },
    async editGenre () {
      const genreObj = {
        editId: this.editId,
        name: this.name
      }
      await this.$store.dispatch('editGenre', genreObj)
      this.$bvModal.show('genreEdited')
      this.isEdit = false
    },
    async addGenre () {
      await this.$store.dispatch('addGenres', this.name)
      this.$bvModal.show('genreAdded')
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
      if (this.isEdit) {
        const tempGenre = this.items.find(genre => genre.id === this.editId)
        this.name = tempGenre.name
        this.nameState = true
      } else {
        this.name = ""
        this.nameState = null
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
