<template>
  <div>
    <el-button @click="addRow">Add</el-button>
    <el-button @click="saveAll">Save All</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="name" :label="loggedInUser.username" width="400">
        <template slot-scope="scope">
          <!-- <el-input size="small"
            style="text-align:center"
            v-model="scope.row.name" controls-position="right"></el-input> -->
          <el-select v-model="scope.row.name" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.Name"
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
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  props: ["tableData", "options"],
  data() {
    return {
      addCount: 0
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"])
  },
  methods: {
    deleteRow(index, rows) {
      this.tableData.splice(index, 1);
      if (this.addCount > 0) --this.addCount;
    },
    saveRow(index, rows) {
      //  api
      console.log("index---> ", index);
      console.log("row---> ", rows);
      const test = this.$axios.$get("statement").then(res => {
        console.log("data", res);
      });
    },
    addRow: function() {
      let newRow = {
        name: this.options[this.addCount].Name,
        itemId: this.options[this.addCount].value,
        send: 0,
        recive: 0,
        out: 0
      };
      this.tableData = [newRow, ...this.tableData];
      ++this.addCount;
    },
    saveAll: function() {
      // api
      console.log(JSON.stringify(this.disabledList));
      console.log("data: ", this.tableData);
      const props = [];
      for (let i in this.tableData) {
        props.push({
          username: this.$auth.user.username,
          date: moment().format("YYYY-MM-DD"),
          itemId: this.options.find(x => x.label == this.tableData[i].name).value,
          item: this.tableData[i].name,
          send: this.tableData[i].send,
          recive: this.tableData[i].recive,
          out: this.tableData[i].out
        });
      }
      console.log('props',props);
      const save = this.$axios.$post("statement/saveall", props).then(res => {
        console.log("res", res);
      });
      const config = this.$axios.$post("config/create", props).then(res => {
        console.log("config", res);
      });
    }
  }
};
</script>
<style lang=""></style>
