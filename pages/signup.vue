<template>
  <div class="shadow-lg p-3 mb-5 bg-white rounded login-panel text-center">
    <b-alert :show="showAlert" variant="danger">
      Auth Fail Please Enter Valid Values
    </b-alert>
    <div class="h5 text-danger">
      Signup
    </div>
    <b-form @submit="onSubmit">
      <div v-if="notShowSubmit">
        <b-form-input
          id="input-1"
          v-model="form.email"
          class="input"
          type="email"
          placeholder="You@example.com"
          required
        />

        <b-form-input
          id="input-3"
          v-model="form.name"
          class="input"
          placeholder="Enter Name"
          required
        />

        <b-form-input
          id="input-2"
          v-model="form.password"
          class="input"
          type="password"
          placeholder="Enter Password"
          required
        />
      </div>
      <div v-if="showSubmit">
        <div class="d-flex justify-content-center">
          <b-form-group v-slot="{ ariaDescribedby }" label="Select Genre">
            <b-form-checkbox-group
              id="checkbox-group-2"
              v-model="selected"
              :aria-describedby="ariaDescribedby"
              name="flavour-2"
            >
              <b-form-checkbox
                v-for="genre in genresList"
                :key="genre.id"
                :value="genre.id"
                class="d-inline-flex float-left"
              >
                {{ genre.name }}
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </div>
      </div>

      <b-button v-if="notShowSubmit" variant="danger" @click="next">
        Next
      </b-button>

      <b-button v-if="showSubmit" variant="danger" @click="prev">
        Prev
      </b-button>

      <b-button v-if="showSubmit" type="submit" variant="success">
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
const Cookie = process.client ? require('js-cookie') : undefined

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
      notShowSubmit: true,
      showAlert: false
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
      let token
      event.preventDefault()
      this.$axios
        .$post('/user/signup', {
          email: this.form.email,
          password: this.form.password,
          name: this.form.name,
          genreList: this.selected
        }).then((res) => {
          token = res.token
          this.$store.commit('setAuth', token)
          Cookie.set('token', token)
          this.$router.replace('/')
        }, (err) => {
          this.showAlert = true
          this.showSubmit = false
          this.notShowSubmit = true
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

<style scoped>
.login-panel {
  max-width: 30vw;
}
.input{
  margin-top: 5px;
  margin-bottom: 10px ;
}
</style>
