<template>
  <div>
    <nuxt-link to="book">
      <b-card
        no-body
        style="max-width: 15rem; padding 0;"
      >
        <template #header>
          <b-card-img
            src="https://images.gr-assets.com/books/1447303603m/2767052.jpg"
            style="max-height:10rem; margine: 0px;"
            alt="Image"
            img-top
          />
        </template>

        <b-card-body>
          <b-card-title>The Hunger Games (The Hunger Games, #1)</b-card-title>
          <b-card-sub-title class="mb-2">
            Penby:Suzanne Collins Rating: 4.5
          </b-card-sub-title>
        </b-card-body>
      </b-card>
    </nuxt-link>
  </div>
</template>
