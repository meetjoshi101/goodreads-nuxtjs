<template>
  <div class="p-2 d-flex flex-column-reverse shadow">
    <div class="text-secondary">
      {{ review.date.slice(0, 10) }}
    </div>
    <div class="my-2">
      {{ review.comment.toUpperCase() }}
    </div>
    <div>
      <b-form-rating
        v-model="review.rating"
        readonly
        show-value
        inline
        precision="2"
        color="#20ce88"
        class="border-0"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: {
      type: Object,
      default: null,
      required: true
    }
  }
}
</script>
