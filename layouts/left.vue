<template>
  <div id="left">
    <button @click="onCollaped" class="nav-collaped">
      <font-awesome-icon v-if="!isCollaped" :icon="['fas', 'bars']" />
      <font-awesome-icon v-if="isCollaped" :icon="['fas', 'times']" />
    </button>

    <left-nav />
    <div class="nuxt">
      <Nuxt />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  middleware: "auth",
  data() {
    return {
     
    };
  },


  computed:{
    ...mapGetters({
      isCollaped: 'isCollaped'
    })


  },

  methods: {
    onCollaped() {
      this.$store.commit('collap')
      console.log("state");
      // this.isCollaped = !this.isCollaped;
    }
  }
};
</script>
<style></style>
