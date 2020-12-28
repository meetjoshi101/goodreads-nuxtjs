<template>
  <div>
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
              <div class="card-text">
                {{ status }}
                <div v-if="!showAddReview">
                  Reviewed
                </div>
              </div>
              <div v-if="!isComplete" class="btn btn-primary" @click="completeRead">
                Complete
              </div>
              <!--<div v-if="isComplete" class="btn btn-danger" @click="deleteRead">
                Delete
              </div>-->
              <div v-if="showAddReview" class="btn btn-primary" @click="addReview">
                Add Review
              </div>
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
  data () {
    return {
      comment: '',
      commentState: null
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
    },
    showAddReview () {
      let isTrue = true
      const array = this.$store.getters.getReviewRead()
      console.log(array)
      array.forEach((review) => {
        if (review === this.read.id) {
          isTrue = false
        }
      })
      return isTrue
    }
  },
  methods: {
    completeRead () {
      this.$store.dispatch('completeRead', this.read.id)
    },
    async deleteRead () {
      await this.$store.dispatch('deleteRead', this.read.id)
    },
    addReview () {
      this.$emit('add-review', this.read.id)
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
