<template>
  <div>
    <the-user-nav-bar />
    <div class="my-4 mx-4 d-flex flex-row">
      <bookimg />
      <pre class="mx-4">
        id:2
        ISBN:"2005018"
        publication_Year:1997
        Author:"J.K. Rowling, Mary GrandPré"
        Title:"Harry Potter and the Sorcerer's Stone (Harry Potter, #1)"
        AvgR  ating:4.44
      </pre>
    </div>
  </div>
</template>
<script>
import Bookimg from '../components/Bookimg.vue'
import TheUserNavBar from '../components/TheUserNavBar'
export default {
  components: {
    TheUserNavBar,
    Bookimg
  }
}
</script>
