<template>
  <div>
    <div class="my-4 mx-4 d-flex flex-row">
      <bookimg />
      <info-panel />
    </div>
    <div class="my-4">
      <revies />
    </div>
  </div>
</template>

<script>
import InfoPanel from '../components/infoPanel'
import revies from '../components/Reviews'
import Bookimg from '../components/Bookimg.vue'
export default {
  layout: 'booklayout',
  components: {
    Bookimg,
    InfoPanel,
    revies
  }
}
</script>

<style>

</style>
