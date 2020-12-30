<template>
  <div class="shadow-lg p-3 mb-5 bg-white rounded login-panel text-center">
    <b-alert :show="showAlert" variant="danger">
      Auth Fail Please Enter Valid Values
    </b-alert>
    <div class="h4 mt-3 text-primary">
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
      <b-button type="submit" class="form-control" variant="primary">
        Submit
      </b-button>
    </b-form>
    <nuxt-link to="/login" class="text-right">
      <p class="mt-4 mb-2 signup-color">
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

@media only screen and (max-width: 600px) {
  .login-panel{
    max-width: 100%;
    height: 300px;
  }
}
</style>
