/* eslint-disable no-console */
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'

const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      Auth: {
        token: null,
        id: null,
        email: '',
        role: ''
      },
      books: [],
      genres: [],
      users: []
    }),
    mutations: {
      setAuth (state, token) {
        const decoded = jwt.verify(token, '123')
        state.Auth.token = token
        state.Auth.id = decoded.id
        state.Auth.email = decoded.email
        state.Auth.role = decoded.role
      },
      LOGOUT (state) {
        state.Auth.token = null
        state.Auth.id = null
        state.Auth.email = ''
        state.Auth.role = ''
      },
      SETUSERS (state, users) {
        state.users = users
      }
    },
    getters: {
      getUsers: state => () => {
        return state.users
      }
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        let token = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            token = parsed.token
            if (token && token.length > 0) {
              commit('setAuth', token)
            }
          } catch (err) {
            // No valid cookie found
            console.log(err)
          }
        }
      },
      //! admin user Apis

      fetchUsers ({ commit }) {
        return this.$axios.$get('/user/users').then(
          (res) => {
            commit('SETUSERS', res.Users)
          },
          (err) => {
            console.log(err)
          }
        )
      },
      addAdmin ({ dispatch }, email) {
        return this.$axios.$patch(`/user/admin-user/${email}`).then(
          (res) => {
            dispatch('fetchUsers')
          },
          (err) => {
            console.log(err)
          }
        )
      },
      deleteUser ({ dispatch }, email) {
        return this.$axios.$delete(`/user/${email}`).then(
          (res) => {
            dispatch('fetchUsers')
          },
          (err) => {
            console.log(err)
          }
        )
      }
    }
  })
}

export default createStore
