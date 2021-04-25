<template>
  <div class="nav">
    <button class="nav-collaped"><font-awesome-icon :icon="['fas', 'bars']" /></button>
    <div class="logo">
      <!-- <img src="logochg.jpg"/> -->
      <h1>HPLS</h1>
      <h2>โรงพยาบาลจุฬารัตน์ 11</h2>
    </div>
    <div class="menu">
      <ul>
        <li>
          <nuxt-link to="/" class="active"
            ><font-awesome-icon :icon="['fas', 'home']" /> หน้าหลัก</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/daily"
            ><font-awesome-icon
              :icon="['fas', 'calendar-alt']"
            /> สั่งผ้ารายวัน</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/profile"
            ><font-awesome-icon :icon="['fas', 'user']" /> โปรไฟล</nuxt-link
          >
        </li>
        <li>
          <a src="/login" @click="logout"
            ><font-awesome-icon :icon="['fas', 'sign-out-alt']" /> ออกจากระบบ</a
          >
        </li>
      </ul>
    </div>
    <div class="nav-footer" style="color: #7d7d7d;">
      &copy; Aom 1998
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isActive: false,
      showNavbar: true
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"])
  },
  methods: {
    async logout() {
      this.isActive = false;
      await this.$auth.logout();
      this.$router.push("/login");
    },
    closeMenu() {
      this.isActive = false;
    }
  }
};
</script>
