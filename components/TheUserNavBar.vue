<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info" class="shadow rounded">
        <b-navbar-brand>
          <nuxt-link class="text-light" to="userDashbord">
            Good Reads
          </nuxt-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <nuxt-link id="mybooks" class="text-light" to="userDashbord">
                My Books
              </nuxt-link>
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search" />
              <b-button size="sm" class="my-2 my-sm-0" type="submit">
                Search
              </b-button>
            </b-nav-form>

            <b-nav-item-dropdown v-if="isLogin" right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <b-avatar variant="light" />
              </template>
              <b-dropdown-item href="#">
                Profile
              </b-dropdown-item>
              <b-dropdown-item @click="logout">
                Sign Out
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>
<style scoped>
#mybooks{
  color:black;
}
</style>
<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  data () {
    return {
      isLogin: true
    }
  },
  methods: {
    logout () {
      Cookie.remove('token')
      this.$store.commit('LOGOUT')
    }
  }
}
</script>
