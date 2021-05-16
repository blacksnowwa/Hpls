<template>
<div>
    <el-button @click="addRow">Add</el-button>
  <el-button @click="saveAll">Save All</el-button>
  <el-table
    :data="tableData"
    :default-sort = "{prop: 'date', order: 'descending'}"
    border
    :summary-method="getSummaries"
    show-summary
    style="width: 100%"
    >
    <el-table-column
    
      prop="date"
      label="วันที่/แผนก"
      width="130"
      sortable>
            <template slot-scope="scope">
          <el-input size="small"
            style="text-align:center"
            v-model="scope.row.date" controls-position="right"></el-input>
       </template>
    </el-table-column>

    <el-table-column
      prop="name"
      label="W.5/2"
      width="80">
            <template slot-scope="scope">
          <el-input size="small"
            style="text-align:center"
            v-model="scope.row.name"></el-input>
       </template>
    </el-table-column>
    <el-table-column
      prop="state"
      label="W.4/2"
      width="80">
      <template slot-scope="scope">
          <el-input size="small"
            style="text-align:center"
            v-model="scope.row.state"
            :disabled="scope.$index<addCount"></el-input>
       </template>
    </el-table-column>
    <el-table-column
      prop="city"
      label="W.6/1"
      width="80">
    </el-table-column>
    <el-table-column
      prop="address"
      label="W. 5/1"
      width="80">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="W.4/1"
      width="80">
    </el-table-column>
        <el-table-column
      prop="ICU"
      label="ICU"
      width="80">
    </el-table-column>
    <el-table-column
      prop="W5-2"
      label="CCU"
      width="80">
    </el-table-column>
    <el-table-column
      prop="state"
      label="Er"
      width="80">
    </el-table-column>
    <el-table-column
      prop="city"
      label="เปล"
      width="80">
    </el-table-column>
    <el-table-column
      prop="address"
      label="X-Ray"
      width="80">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="กายภาพ"
      width="80">
    </el-table-column>
        <el-table-column
      prop="name"
      label="OPD M"
      width="80">
    </el-table-column>
    <el-table-column
      prop="W5-2"
      label="Ortho"
      width="80">
    </el-table-column>
    <el-table-column
      prop="state"
      label="สูติ"
      width="80">
    </el-table-column>
    <el-table-column
      prop="city"
      label="OPD I"
      width="80">
    </el-table-column>
    <el-table-column
      prop="address"
      label="เคมี"
      width="80">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="ทันตกรรม"
      width="80">
    </el-table-column>
        <el-table-column
      prop="name"
      label="ทันตกรรม"
      width="80">
    </el-table-column>
    <el-table-column
      prop="W5-2"
      label="จร. 12"
      width="80">
    </el-table-column>
    <el-table-column
      prop="state"
      label="LR"
      width="80">
    </el-table-column>
    <el-table-column
      prop="city"
      label="ไตเทียม"
      width="80">
    </el-table-column>
    <el-table-column
      prop="address"
      label="Nursery"
      width="80">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="แม่บ้าน"
      width="80">
    </el-table-column>
 
        <el-table-column
      prop="name"
      label="ทันตกรรม"
      width="80">
    </el-table-column>
    <el-table-column
      prop="W5-2"
      label="จร. 12"
      width="80">
    </el-table-column>
    <el-table-column
      prop="state"
      label="LR"
      width="80">
    </el-table-column>
    <el-table-column
      prop="city"
      label="ไตเทียม"
      width="80">
    </el-table-column>
    <el-table-column
      prop="address"
      label="Nursery"
      width="80">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="แม่บ้าน"
      width="80">
    </el-table-column>
    
        <el-table-column
      prop="name"
      label="ห้องอาหาร"
      width="80">
    </el-table-column>
    <el-table-column
      prop="W5-2"
      label="supply"
      width="80">
    </el-table-column>
    <el-table-column
      prop="state"
      label="OR"
      width="80">
    </el-table-column>
    <el-table-column
      prop="city"
      label="Cath Lab"
      width="80">
    </el-table-column>
    <el-table-column
      prop="address"
      label="IVF Lab"
      width="80">
    </el-table-column>
    <el-table-column

      prop="zip"
      label="sum รายวัน"
      width="80">
    </el-table-column>
        <el-table-column

      prop="address"
      label="น้ำหนัก"
      width="80">
    </el-table-column>
    <el-table-column

      prop="zip"
      label="หัก"
      width="80">
    </el-table-column>
        <el-table-column

      prop="zip"
      label="สุทธิ"
      width="80">
    </el-table-column>
        <el-table-column  label="Operations" width="120">
      <template slot-scope="scope">
        <el-button @click.native.prevent="saveRow(scope.$index, scope.row)" type="text" size="small">
         Report
        </el-button>
        <el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" type="text" size="small">
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
  
</template>

<script>

  export default {
    props: ['tableData'],
    data(){
      return{
        addCount:0
      }
    },
     methods: {
    

    
      
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Total Cost';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] =  values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
       deleteRow(index, rows) {
        this.tableData.splice(index, 1);
        if(this.addCount > 0)
          -- this.addCount;
      },
     saveRow(index, rows) { 
        //  api
        this.$router.push('/report')
      },
     addRow:function(){
        var d = new Date();
        var n = d.toLocaleDateString();
       let newRow  = {
        date: n,
         state:"2",
         zip: "32",
       };
       this.tableData = [newRow,...this.tableData];
       ++ this.addCount;
     },
     saveAll:function(){
       // api
       console.log(JSON.stringify(this.disabledList));
     },
    }

  }
</script>