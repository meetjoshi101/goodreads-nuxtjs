<template>
  <div class="mx-4 ">
    <img :src="imageUrl" class="image" alt="Book Image">
  </div>
</template>
<script>
export default {
  props: {
    imageUrl: {
      type: String,
      default: null,
      required: true
    }
  }
}
</script>
<style scoped>
.image{
  width: 15vw;
  height: 20vw;
}
</style>
