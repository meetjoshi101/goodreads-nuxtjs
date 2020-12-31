<template>
  <b-list-group>
    <NuxtLink
      v-for="link in links"
      :key="link.slug"
      :to="link.slug"
      class=" link-colour"
    >
      <div>
        {{ link.name }}
      </div>
    </NuxtLink>
  </b-list-group>
</template>
<script>
export default {
  data () {
    return {
      links: [
        {
          slug: '/admin',
          name: 'Dashbord'
        },
        {
          slug: '/admin/usersAdmin',
          name: 'User'
        },
        {
          slug: '/admin/genres',
          name: 'Genre'
        },
        {
          slug: '/admin/books',
          name: 'Books'
        }
      ]
    }
  }
}
</script>
<style scoped>
.link-colour {
  color: #20ce88;
  font-weight: 200;
}
a.nuxt-link-exact-active {
  color: #2ebdff;
  font-weight: 200;
  text-decoration: none;
}
</style>
