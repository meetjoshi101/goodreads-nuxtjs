<template>
  <div>
    <b-card-group deck>
      <b-card
        border-variant="primary"
        header="Books"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>
          <b-icon icon="book" />
          10000
        </b-card-text>
      </b-card>
      <b-card
        border-variant="secondary"
        header="Genres"
        header-border-variant="info"
        align="center"
      >
        <b-card-text>
          <b-icon-bookmark-heart-fill />
          100
        </b-card-text>
      </b-card>
      <b-card
        border-variant="danger"
        header="User"
        header-border-variant="danger"
        header-text-variant="danger"
        align="center"
      >
        <b-card-text>
          <b-icon-emoji-laughing />1000
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  middleware: [
    'adminAuthanticated'
  ],
  layout: 'default',
  created () {
    this.$axios.setToken(this.$store.state.Auth.token, 'Bearer')
  }
}
</script>

<style>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
