<template>
  <div>
    <div>
      <b-navbar
        toggleable="lg"
        variant="light"
        class="shadow-sm rounded bg-white"
      >
        <b-navbar-brand>
          <nuxt-link to="/" class="title">
            Good Reads
          </nuxt-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-if="isLogin">
              <nuxt-link to="/my-reads" class="nav-link">
                My Reads
              </nuxt-link>
            </b-nav-item>
            <b-nav-item v-if="isLogin">
              <nuxt-link to="/my-review" class="nav-link">
                My Reviews
              </nuxt-link>
            </b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-icon
                v-if="search"
                icon="x-circle"
                style="height: 25px; width: 25px;"
                class="mr-2"
                variant="danger"
                @click="clearSearch"
              />
              <b-form-input
                v-model="search"
                size="sm"
                class="mr-sm-2"
                placeholder="Search"
              />
              <b-button
                size="sm"
                class="my-2 my-sm-0 search-button"
                @click="searchRoute"
              >
                Search
              </b-button>
            </b-nav-form>
            <b-nav-item-dropdown v-if="isLogin" right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <b-avatar variant="light" />
              </template>
              <b-dropdown-item @click="logout">
                Sign Out
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item v-if="!isLogin">
              <nuxt-link to="/login">
                Login
              </nuxt-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-labels */
/* eslint-disable no-unused-expressions */
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  data () {
    return {
      search: this.$route.query.search
    }
  },
  computed: {
    isLogin () {
      if (this.$store.state.Auth.token) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    clearSearch () {
      this.search = ''
      this.$router.push({ path: this.$route.path })
    },
    logout () {
      Cookie.remove('token')
      this.$store.commit('LOGOUT')
      this.$router.go('/')
    },
    searchRoute () {
      this.$router.push({ path: '/', query: { search: this.search } })
    }
  }
}
</script>
<style scoped>
.title {
  color: #20ce88;
}
.nav-link {
  color: grey;
}
.search-button {
  background-color: #20ce88;
  border: #20ce88;
}
a.nuxt-link-active {
    color: #20ce88 !important;
}
</style>
