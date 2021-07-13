<template>
  <transition name="fade">
    <div class="nav" v-if="window || isCollaped">
      <div class="logo">
  
        <!-- <img src="logochg.jpg"/> -->
        <h1>HPLS</h1>
        <h2>โรงพยาบาลจุฬารัตน์ 11</h2>
      </div>
      <div class="menu">
        <ul>
          <li>
            <nuxt-link to="/" class="active" @click="closeMenu"
              ><font-awesome-icon :icon="['fas', 'home']" /> หน้าหลัก</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/daily"
              ><font-awesome-icon :icon="['fas', 'calendar-alt']" />
              สั่งผ้ารายวัน</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/profile" 
              ><font-awesome-icon :icon="['fas', 'user']" /> โปรไฟล</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/items" 
              ><font-awesome-icon :icon="['fas', 'tshirt']" /> จัดการผ้า</nuxt-link
            >
          </li>
          <li>
            <a src="/login" @click="logout"
              ><font-awesome-icon :icon="['fas', 'sign-out-alt']" />
              ออกจากระบบ</a
            >
          </li>
        </ul>
      </div>
      <div class="nav-footer" style="color: #7d7d7d;">
        &copy; Aom 1998
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isActive: false,
      showNavbar: true,
      showNav:true
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser","isCollaped"]),

    window(){
      return window.innerWidth > 600
    }
 
  
  },

  methods: {
 
    async logout() {
      this.isActive = false;
      await this.$auth.logout();
      this.$router.push("/login");
    },
    closeMenu() {
      console.log('closeMenu');
      this.$store.commit('closemenu')
    }
  },

  watch:{
    isCollaped:{

      immediate: true,

      handler(v) {
        this.showNav = window.innerWidth > 600 || v
      }

    }
  }
};
</script>
