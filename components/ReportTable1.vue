<template>
  <el-table :data="tableData" border type="index" style="width: 100%">
    <el-table-column
      background
      prop="i"
      label="ลำดับ"
      width="60"
      align="center"
    >
    </el-table-column>
    <el-table-column background prop="item" label="รายการ"> </el-table-column>
    <el-table-column prop="t_send" label="ส่ง"  align="center" :width="size"> </el-table-column>
    <el-table-column prop="send0" label=""  align="center" :width="size"> </el-table-column>
    <el-table-column prop="over" label="เกิน"  align="center" :width="size"> </el-table-column>
    <el-table-column prop="remind" label="ค้าง"  align="center" :width="size"> </el-table-column>
    <el-table-column prop="description" label="หมายเหตุ"  width="100"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ["tableData"],
  data() {
    return {
      size: 60
    };
  }
};
</script>
<style></style>
