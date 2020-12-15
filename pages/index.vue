<template>
  <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
    <div class="col mb-2">
      <TheBookcard />
    </div>
    <div class="col mb-2">
      <TheBookcard />
    </div>
    <div class="col mb-2">
      <TheBookcard />
    </div>
    <div class="col mb-2">
      <TheBookcard />
    </div>
    <div class="col mb-2">
      <TheBookcard />
    </div>
  </div>
</template>

<script>
import TheBookcard from '../components/TheBookCard'

export default {
  middleware: [
    'authanticated'
  ],
  layout: 'users',
  components: {
    TheBookcard
  }
}
</script>

<style >
</style>
