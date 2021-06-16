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
  allData:[],
  table:[]
    };
  },
   async asyncData({ app }) {
    try {
      const all = await app.$axios.$get("statement")
      return {
        allData:all
      };
    } catch (error) {}
  },
  created(){
    this.$store.commit('closemenu')
    for(let i in this.allData){
      if(i == 0){
        this.table.push({
          date:this.allData[i].date,
          username:this.allData[i].username,
          send:this.allData[i].send,
        })
      }
      else
      if(this.allData[i].date == this.allData[i-1].date && this.allData[i].username == this.allData[i-1].username){

         this.table.find(x=>{
            return x.date == this.allData[i].date && x.username == this.allData[i].username
          }).send += this.allData[i].send
          // console.log('aaaa==..',a);

      }else {
          this.table.push({
          date:this.allData[i].date,
          username:this.allData[i].username,
          send:this.allData[i].send,
      })

      }
    }
    console.log('table',this.table);
    
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
