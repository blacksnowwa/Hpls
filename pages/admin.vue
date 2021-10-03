<template>
  <el-table :data="dataFilter" stripe style="width: 100%">
    <el-table-column prop="date" label="วันที่" width="180"> </el-table-column>
    <el-table-column prop="username" label="ห้อง" width="180">
    </el-table-column>
    <el-table-column prop="item" label="รายการ"> </el-table-column>
    <el-table-column prop="send" label="ส่ง"> </el-table-column>
    <el-table-column prop="recive" label="เบิก"> </el-table-column>
    <el-table-column prop="out" label="ค้าง"> </el-table-column>
  </el-table>
</template>

<script>
import moment from "moment";
export default {
  layout: "left",
  data() {
    return {
      tableData: []
    };
  },
  async asyncData({ app }) {
    try {
      const table = await app.$axios.$get("statement");
      return {
        tableData: table.map(x => {
          x.date = moment(x.date).format("YYYY-MM-DD");
          return x;
        })
      };
    } catch (error) {}
  },
  computed: {
    dataFilter() {
      return this.tableData
        .filter(x => x.date == moment().format("YYYY-MM-DD"))
        .map(x => {
          x.date = moment(x.date, "YYYY-MM-DD").format("DD/MM/YYYY");
          return x;
        });
      // .sort(function(a, b){return a.username - b.username});
    }
  }
};
</script>
