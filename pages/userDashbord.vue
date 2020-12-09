<template>
  <div>
    user Page
  </div>
</template>

<script>
export default {
  layout: 'users'
}
</script>

<style >
a.nuxt-link-active {
  color: yellow;
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #00c58e;
}

a:hover{
  text-decoration: none;
  color: aquamarine;
  font-size: 120%;
}
</style>
