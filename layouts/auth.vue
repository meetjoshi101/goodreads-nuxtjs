<template>
  <div>
    <div>
      <div class="h3 text-center pt-4 goodreads-auth-title">
        Goodreads
      </div>
    </div>
    <div class="auth-style">
      <Nuxt />
    </div>
  </div>
</template>
<style>
.auth-style{
  margin-top: 20vh;
  margin-left: 35vw;
}
.goodreads-auth-title{
  color: #20ce88;
  font-weight: bold;
}
@media only screen and (max-width: 600px) {
  .auth-style{
    margin-left: 0px;
  }
}
</style>
