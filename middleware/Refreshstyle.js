
export default {
  beforeCreate () {
    if (!process.server) {
      if (window.__NUXT_LAYOUT__ && window.__NUXT_LAYOUT__ !== this) {
        window.location.reload()
      }

      window.__NUXT_LAYOUT__ = this
    }
  }
}
