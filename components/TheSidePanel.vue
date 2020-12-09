<template>
  <b-list-group>
    <NuxtLink to="/">
      <b-list-group-item class="bg-dark">
        Dashbord
      </b-list-group-item>
    </NuxtLink>

    <NuxtLink to="/books">
      <b-list-group-item class="bg-dark">
        Books
      </b-list-group-item>
    </NuxtLink>

    <NuxtLink to="/genres">
      <b-list-group-item class="bg-dark">
        Genre
      </b-list-group-item>
    </NuxtLink>

    <NuxtLink to="/users">
      <b-list-group-item class="bg-dark">
        User
      </b-list-group-item>
    </NuxtLink>
  </b-list-group>
</template>
