<template>
  <b-list-group>
    <NuxtLink v-for="link in links" :key="link.slug" to="/">
      <b-list-group-item class="bg-dark">
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
          slug: '/users',
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
