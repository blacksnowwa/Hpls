<template>
  <div id="left">
    <button @click="onCollaped" class="nav-collaped">
      <font-awesome-icon v-if="!isCollaped" :icon="['fas', 'bars']" />
      <font-awesome-icon v-if="isCollaped" :icon="['fas', 'times']" />
    </button>
    <left-nav :isCollaped="isCollaped" />
    <div class="nuxt">

      <Nuxt />
    </div>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  data() {
    return {
      isCollaped: false
    };
  },

  methods: {
    onCollaped() {
      this.isCollaped = !this.isCollaped;
    }
  }
};
</script>
<style></style>
