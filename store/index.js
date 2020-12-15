/* eslint-disable no-console */
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'

const cookieparser = process.server ? require('cookieparser') : undefined

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      Auth: {
        token: null,
        email: '',
        role: ''
      }
    }),
    mutations: {
      setAuth (state, token) {
        const decoded = jwt.verify(token, '123')
        state.Auth.token = token
        state.Auth.email = decoded.email
        state.Auth.role = decoded.role
      }
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        let auth = null
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
          try {
            auth = JSON.parse(parsed.auth)
          } catch (err) {
            // No valid cookie found
          }
        }
        console.log(auth)
        // commit('setAuth', auth)
      }
    }
  })
}

export default createStore