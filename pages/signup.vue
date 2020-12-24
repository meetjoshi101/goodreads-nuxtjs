<template>
  <div class="shadow-lg p-3 mb-5 bg-white rounded login-panel text-center">
    <b-alert :show="showAlert" variant="danger">
      Auth Fail Please Enter Valid Values
    </b-alert>
    <div class="h5 text-danger">
      Signup
    </div>
    <b-form @submit="onSubmit">
      <div>
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
      <b-button type="submit" variant="success">
        Submit
      </b-button>
    </b-form>
    <nuxt-link to="/login" class="text-right">
      <p class="my-4 signup-color">
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
      genresList: [1],
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
.signup-color{
  color: rgb(138, 138, 138);
  font-size: 0.7rem;
}
</style>
