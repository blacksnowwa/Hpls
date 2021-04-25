<template>
  <el-table
    :data="tableData"
    border
    type=index
    style="width: 100%">
    <el-table-column
      background
      prop="name"
      label="รายการ"
     >
    </el-table-column>
    <el-table-column
      prop="send"
      label="ส่ง"
      >
    </el-table-column>
    <el-table-column
      prop="send0"
      label=""
      >
      
    </el-table-column>
        <el-table-column
      prop="over"
      label="เกิน"
      >
      
    </el-table-column>
        <el-table-column
      prop="remind"
      label="ค้าง"
      >
      
    </el-table-column>
        <el-table-column
      prop="description"
      label="หมายเหตุ"
      >
      
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
 tableData: [{
          name:"ผ้าห่มขาว",
         send:"12",
         recive: "12",
        }, {
          name:"ผ้าปูลาย",
         send:"2",
         recive: "1",
        }, {
          name:"ผ้าปูรัดมุมลาย 5 ฟุต",
         send:"22",
         recive: "11",
            }, {
          name:"ปลอกหมอนลาย",
         send:"6",
         recive: "14",
        }],
        options: [{
          value: 'Option1',
          label: 'ผ้าห่มขาว'
        }, {
          value: 'Option2',
          label: 'ผ้าปูลาย'
        }, {
          value: 'Option3',
          label: 'ผ้าปูรัดมุมลาย 5 ฟุต'
        }, {
          value: 'Option4',
          label: 'ปลอกหมอนลาย'
        }, {
          value: 'Option5',
          label: 'ปลอกหมอนลายเด็ก'
        }],
      }
    }
  }
</script>
<style>

</style>