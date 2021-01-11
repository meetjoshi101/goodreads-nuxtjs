
<template>
  <div class="shadow-lg p-3 mb-5 bg-white text-center rounded login-panel">
    <b-alert :show="showAlert" variant="danger">
      Auth Fail please enter correct Email and Password
    </b-alert>
    <div class="h4 mt-4 text-primary">
      Login
    </div>
    <b-form @submit="onSubmit">
      <b-form-input
        id="input-1"
        v-model="form.email"
        class="mb-2"
        type="email"
        placeholder="Enter email"
        required
      />
      <b-form-input
        id="input-2"
        v-model="form.password"
        class="mb-2"
        type="password"
        placeholder="Enter Password"
        required
      />
      <b-button type="submit" class="form-control" variant="primary">
        Submit
      </b-button>
    </b-form>
    <nuxt-link to="/signup" class="text-right">
      <p class="mt-4 signup-color">
        Don't Have Account Click Here To Signup
      </p>
    </nuxt-link>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
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
        password: '',
        authantication: null
      },
      showAlert: false
    }
  },
  watch: {
    authantication (newValue) {
      if (newValue === true) {
        console.log('true')
      } else {
        console.log('false')
      }
    }
  },
  methods: {
    onSubmit (event) {
      let token
      event.preventDefault()
      this.$axios.$post('/user/login', {
        email: this.form.email,
        password: this.form.password
      }).then(
        (res) => {
          token = res.token
          this.$store.commit('setAuth', token)
          Cookie.set('token', token)
          this.$router.replace('/')
        },
        (err) => {
          console.log(err.message)
          this.showAlert = true
          this.$router.push('/signup')
        }
      )
    }
  }
}
</script>

<style scoped>
.login-panel{
   max-width: 400px;
   height: 300px;
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
