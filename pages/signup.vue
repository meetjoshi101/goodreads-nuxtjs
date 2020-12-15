<template>
  <div class="shadow-lg p-3 mb-5 bg-white rounded login-panel text-center">
    <div class="h5">
      signup
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
      <b-button type="submit" variant="primary">
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
export default {
  layout: 'auth',
  data () {
    return {
      form: {
        email: '',
        name: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    }
  }
}
</script>

<style>
.login-panel{
   max-width: 50vw;
}
</style>
