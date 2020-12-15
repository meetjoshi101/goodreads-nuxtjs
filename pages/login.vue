<template>
  <div class="shadow-lg p-3 mb-5 bg-white rounded login-panel text-center">
    <div class="h5">
      Login
    </div>
    <b-form @submit="onSubmit">
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
      <b-form-group id="input-group-2" label="Passwors" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Enter Password"
          required
        />
      </b-form-group>
      <b-button type="submit" variant="primary">
        Submit
      </b-button>
    </b-form>
    <nuxt-link to="/signup" class="text-right">
      <p class="my-4">
        Don't Have Account Click Here To Signup
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
        password: '',
        authantication: null
      }
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
          // this.$router.push('/userDashbord')
        },
        (err) => {
          console.log(err.message)
          // this.$router.push('/signup')
        }
      )
    }
  }
}
</script>

<style>
.login-panel{
   max-width: 50vw;
}
</style>
