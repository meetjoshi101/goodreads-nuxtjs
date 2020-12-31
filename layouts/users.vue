<template>
  <div>
    <div>
      <the-user-nav-bar />
    </div>

    <b-container class="mt-4" fluid>
      <b-row class="p-2">
        <b-col cols="2">
          <the-user-side-panel />
        </b-col>
        <b-col cols="10">
          <Nuxt />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import TheUserNavBar from '../components/TheUserNavBar'
import TheUserSidePanel from '../components/TheUserSidePanel'

export default {
  components: {
    TheUserNavBar,
    TheUserSidePanel
  }
}
</script>

<style>
</style>
