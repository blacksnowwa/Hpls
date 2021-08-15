<template lang="">
  <div>
    <div class="p-8 text-2xl">วันที่ 20/6/12</div>
    <div class="report">
      <div class="section1">
        <ReportTable1 :table-data="tableData1" />
      </div>
      <div class="section1">
        <ReportTable1 :table-data="tableData2" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "left",
  data() {
    return {
      tableData1: [],
      tableData2: []
    };
  },
  async asyncData({ app }) {
    try {
      const table = await app.$axios.$get("statement/report", {
        params: { date: "2021-06-20" }
      });
      console.log("table", table);
      return {
        table
      };
    } catch (error) {}
  },
  created() {
    console.log("table", this.table);
    this.splitData();
  },
  methods: {
    splitData() {
      let data1 = [];
      let data2 = [];
      const len = this.table.length;
      for (let i in this.table) {
        if (i < len / 2) {
          data1.push(Object.assign(this.table[i], { i: parseInt(i) + 1 }));
        } else {
          data2.push(Object.assign(this.table[i], { i: parseInt(i) + 1 }));
        }
      }
      this.tableData1 = data1;
      this.tableData2 = data2;
      console.log("1", this.tableData1);
      console.log("2", this.tableData2);
    }
  }
};
</script>
<style>
.report {
  display: flex;
}
.report .section1 {
  width: 50%;
  height: 100%;
}
</style>
