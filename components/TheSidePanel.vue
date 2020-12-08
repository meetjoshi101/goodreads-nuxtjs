<template>
  <b-list-group>
    <NuxtLink to="/">
      <b-list-group-item>
        Dashbord
      </b-list-group-item>
    </NuxtLink>

    <NuxtLink to="/books">
      <b-list-group-item>
        Books
      </b-list-group-item>
    </NuxtLink>

    <NuxtLink to="/genres">
      <b-list-group-item class="">
        Genre
      </b-list-group-item>
    </NuxtLink>
    <b-list-group-item class="">
      User
    </b-list-group-item>
  </b-list-group>
</template>
