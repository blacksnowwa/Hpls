<template lang="">
    <div>
   
        <DailyTable :tableData="tableData" :options="options"/>
    </div>
</template>
<script>
export default {
    layout:'left',

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
       addCount:0
      }
    }
}
</script>
<style >

.el-table__row .el-input .el-input__inner{
  border-style:none;
}
.hover-row .el-input .el-input__inner{
  border-style:solid;   
}



</style>