<template>
  <div class="col">
    <div class="card my-4 mx-4">
      <div class="row">
        <div class="col-md-4">
          <img :src="read.image" alt="book image">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h6 class="card-title">
              {{ read.Title }}
            </h6>
            <p class="card-text">
              {{ read.status }}
            </p>
            <div class="btn btn-primary">
              Complete
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  props: {
    read: {
      type: Object,
      default: null,
      required: true
    }
  },
  created () {
    console.log(this.read)
  }
}
</script>

<style scoped>
</style>
