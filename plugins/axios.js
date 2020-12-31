/* eslint-disable no-console */
export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    config.headers.common.Authorization = `Bearer ${store.state.Auth.token}`
  })
}
