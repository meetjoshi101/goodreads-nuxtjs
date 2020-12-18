/* eslint-disable no-console */
export default function ({ $axios, store }) {
  $axios.setToken(store.state.Auth.token, 'Bearer')
}
