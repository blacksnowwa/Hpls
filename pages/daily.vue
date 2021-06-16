<template lang="">
  <div>
    <DailyTable :tableData="tableData" :options="options" />
  </div>
</template>
<script>
export default {
  layout: "left",

  data() {
    return {
      "addCount": 0
    };
  },

  async asyncData({ app }) {
    try {
      const table = await app.$axios.$get("config/" + app.$auth.user.username)
      const option = await app.$axios.$get("items")
      console.log("table",table);
      return {
        tableData: table,
        options: option.map(x=>{
          x.value = x.id
          x.label = x.Name
          return x
        })
      };
    } catch (error) {}
  },
  created() {
    console.log("dialy");
    this.$store.commit("closemenu");
  }
};
</script>

<style>
.el-table__row .el-input .el-input__inner {
  border-style: none;
}
.hover-row .el-input .el-input__inner {
  border-style: solid;
}
</style>
