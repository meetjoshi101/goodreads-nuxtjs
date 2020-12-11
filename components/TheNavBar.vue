<template>
  <div>
    <b-navbar toggleable="lg" type="light" class="shadow p-3 mb-5 rounded bg-nav-colour">
      <b-navbar-brand href="#" class="font-weight-normal">
        <div class="nav-logo-colour h2">
          GoodReads
        </div>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-avatar variant="dark" />
            </template>
            <b-dropdown-item href="#">
              Profile
            </b-dropdown-item>
            <b-dropdown-item href="#">
              Sign Out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'TheNavBar'
}
</script>

<style>

.bg-nav-colour{
  background-color: white;
}
.nav-logo-colour{
  color: #20CE88;
}
</style>
