<template>
  <div class="col">
    <div class="card">
      <div class="row">
        <div class="col-md-2">
          <img :src="read.image" alt="book image">
        </div>
        <div class="col-md-10">
          <div class="card-body">
            <h6 class="card-title">
              {{ read.Title }}
            </h6>
            <p class="card-text">
              {{ status }}
            </p>
            <div v-if="!isComplete" class="btn btn-primary" @click="completeRead">
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
  computed: {
    isComplete () {
      if (this.read.status === 'C') {
        return true
      } else {
        return false
      }
    },
    status () {
      if (this.read.status === 'C') {
        return 'Completed'
      } else {
        return 'Reading'
      }
    }
  },
  methods: {
    completeRead () {
      this.$store.dispatch('completeRead', this.read.id)
    }
  }
}
</script>

<style scoped>
.card{
  min-width: 40vw;
  max-width: 40vw;
}
</style>
