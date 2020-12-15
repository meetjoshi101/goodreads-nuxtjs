<template>
  <div class="shadow-lg p-3 mb-5 bg-white rounded login-panel text-center">
    <div class="h5">
      signup
    </div>
    <b-form @submit="onSubmit">
      <div v-if="notShowSubmit">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          />
        </b-form-group>
        <b-form-group id="input-group-3" label="Name" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.name"
            placeholder="Enter Name"
            required
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Passwors" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Enter Password"
            required
          />
        </b-form-group>
      </div>
      <div v-if="showSubmit">
        <b-form-group v-slot="{ ariaDescribedby }" label="Using sub-components:">
          <b-form-checkbox-group
            id="checkbox-group-2"
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="flavour-2"
          >
            <b-form-checkbox v-for="genre in genresList" :key="genre.id" :value="genre.id">
              {{ genre.name }}
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </div>

      <b-button v-if="notShowSubmit" variant="danger" @click="next">
        Next
      </b-button>

      <b-button v-if="showSubmit" variant="danger" @click="prev">
        Prev
      </b-button>

      <b-button v-if="showSubmit" type="submit" variant="primary">
        Submit
      </b-button>
    </b-form>
    <nuxt-link to="/login" class="text-right">
      <p class="my-4">
        Have Account Click Here To Login
      </p>
    </nuxt-link>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  middleware: [
    'notAuthanticated'
  ],
  layout: 'auth',
  data () {
    return {
      form: {
        email: '',
        name: '',
        password: ''
      },
      genresList: [],
      selected: [],
      showSubmit: false,
      notShowSubmit: true
    }
  },
  created () {
    this.$axios
      .$get('/genre')
      .then((res) => {
        this.genresList = res.genres
      }, (err) => {
        console.log(err)
      })
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      this.$axios
        .$post('/user/signup', {
          email: this.form.email,
          password: this.form.password,
          name: this.form.name,
          genreList: this.selected
        }).then((res) => {
          console.log(res)
        }, (err) => {
          console.log(err)
        })
    },
    next () {
      this.showSubmit = true
      this.notShowSubmit = false
    },
    prev () {
      this.showSubmit = false
      this.notShowSubmit = true
    }
  }
}
</script>

<style>
.login-panel {
  max-width: 50vw;
}
</style>
