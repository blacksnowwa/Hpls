<template lang="th">
  <div>
    <TableAll :tableData="tableData" />
  </div>
</template>
<script>
import moment from "moment";


export default {
  layout: "left",
  data() {
    return {
  
    };
  },
   computed: {
    tableData() {
      const data = [];

      for (var i = 0; i < 30; i++) {
        data.push({
          date: moment().add(-i, "days").format("YYYY/MM/DD"),
          name: "1",
          state: "2",
          city: "3",
          address: "4",
          zip: "5"
        });
      }
      return data;
    }
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
