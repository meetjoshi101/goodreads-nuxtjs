<template>
  <b-list-group>
    <NuxtLink v-for="link in links" :key="link.slug" :to="link.slug">
      <b-list-group-item class="bg-dark link-colour">
        {{ link.name }}
      </b-list-group-item>
    </NuxtLink>
  </b-list-group>
</template>
<script>
export default {
  data () {
    return {
      links: [
        {
          slug: '/usersAdmin',
          name: 'User'
        },
        {
          slug: '/genres',
          name: 'Genre'
        },
        {
          slug: '/books',
          name: 'Books'
        },
        {
          slug: '/',
          name: 'Dashbord'
        }
      ]
    }
  }
}
</script>
<style scoped>
a.nuxt-link-exact-active {
  color: red;
}
.link-colour{
  color: #20ce88;
  font-weight: 200;
}
</style>
