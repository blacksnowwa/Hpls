<template>
  <nav class="navbar is-light">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item " to="/">HPLS</nuxt-link>
        <a :aria-expanded="isActive" :class="{ 'is-active': isActive }" role="button" class="navbar-burger" aria-label="menu" data-target="collapse" @click="isActive = !isActive" >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div  id="collapse" :class="{ 'is-active': isActive }" class="navbar-menu is-paddingless" >
        <div class="navbar-end">
           <nuxt-link class="navbar-item" to="/daily" @click.native="closeMenu" v-if="isAuthenticated">daily</nuxt-link>
          <nuxt-link class="navbar-item" to="/" @click.native="closeMenu" v-if="isAuthenticated">Index</nuxt-link>
          <div v-if="isAuthenticated">
          <div class="navbar-item has-dropdown is-hoverable" >
            <a class="navbar-link">
              {{ loggedInUser.username }}
            </a>
            <div class="navbar-dropdown">
              <nuxt-link class="navbar-item" to="/profile" @click.native="closeMenu">My Profile</nuxt-link>
              <hr class="navbar-divider"/>
              <a class="navbar-item" @click="logout">Logout</a>
            </div>
            </div>
          </div>
          <template v-else>
            <nuxt-link class="navbar-item" to="/register" @click.native="closeMenu">Register</nuxt-link>
            <nuxt-link class="navbar-item" to="/login" @click.native="closeMenu">Log In</nuxt-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isActive: false,
      showNavbar: true
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
    methods: {
    async logout() {
    this.isActive = false
      await this.$auth.logout();
      this.$router.push('/login')
    },
    closeMenu() {
      this.isActive = false
    },
  },
}
</script>