<template>
  <div>
    <el-button @click="addRow">Add</el-button>
    <el-button @click="saveAll">Save All</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="name" label="w.5/2" width="400">
        <template slot-scope="scope">
          <!-- <el-input size="small"
            style="text-align:center"
            v-model="scope.row.name" controls-position="right"></el-input> -->
          <el-select v-model="scope.row.name" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="send" label="ส่ง" width="100">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.send"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="recive" label="รับ" width="100">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.recive"
            :disabled="scope.$index < addCount"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="remain" label="ค้าง" width="100">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.remian"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column label="Operations" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="saveRow(scope.$index, scope.row)"
            type="text"
            size="small"
          >
            Save
          </el-button>
               <el-button
            @click.native.prevent="deleteRow(scope.$index, scope.row)"
              type="text"
            size="small"
          >
               Delete
          </el-button>
          </template>
       </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: ["tableData", "options"],
     data(){
      return{
        addCount:0
      }
    },
  methods: {
    deleteRow(index, rows) {
      this.tableData.splice(index, 1);
      if (this.addCount > 0) --this.addCount;
    },
    saveRow(index, rows) {
      //  api
    },
    addRow: function() {
      let newRow = {
        name: "ผ้าห่มขาว",
        send: "",
        recive: ""
      };
      this.tableData = [newRow, ...this.tableData];
      ++this.addCount;
    },
    saveAll: function() {
      // api
      console.log(JSON.stringify(this.disabledList));
    }
  }
};
</script>
<style lang=""></style>
