<template>
  <div>
    <TheNavBar />
    <b-container class="mt-4" fluid>
      <b-row class="p-2">
        <b-col cols="2">
          <TheSidePanel />
        </b-col>
        <b-col cols="10">
          <Nuxt />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import TheNavBar from '../components/TheNavBar'
import TheSidePanel from '../components/TheSidePanel'
import RefreshStyles from '../middleware/Refreshstyle'

export default {
  components: {
    TheNavBar,
    TheSidePanel
  },
  mixins: [RefreshStyles]
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
* {
  padding: 0px;
  margin: 0px;
}
.nuxt-link-active {
  color: yellow;
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
/* .nuxt-link-exact-active {
  color: #00c58e;
} */

a:hover{
  text-decoration: none;
  color: aquamarine;
  font-size: 120%;
}

</style>
