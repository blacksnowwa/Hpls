<template>
  <div>
    <div class="mb-4">
      <el-button type="primary" icon="el-icon-circle-plus" @click="addRow"
        >Add</el-button
      >
      <el-button type="success" icon="el-icon-check" @click="saveAll"
        >Save All</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="80"> </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        :label="loggedInUser.username"
        width="300"
      >
        <template slot-scope="scope">
          <!-- <el-input size="small"
            style="text-align:center"
            v-model="scope.row.name" controls-position="right"></el-input> -->
          <el-select
            style="width: 100%"
            v-model="scope.row.name"
            placeholder="Select"
          >
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
      <el-table-column prop="send" align="center" label="ส่ง" width="80">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.send"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="recive" align="center" label="เบิก" width="80">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.recive"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="remain" align="center" label="ค้าง" width="80">
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.remian"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column />
      <el-table-column label="จัดการ" width="120">
        <template slot-scope="scope">
          <!-- <el-button
            @click.native.prevent="saveRow(scope.$index, scope.row)"
            type="text"
            size="small"
          >
            Save
          </el-button> -->
          <el-button
            @click.native.prevent="deleteRow(scope.$index, scope.row)"
            type="danger"
            round
            plain
            icon="el-icon-delete"
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
      console.log("addRow");
    },
    saveAll: function() {
      const format = "hh:mm:ss";
      const now = moment(),
        beforeTime = moment("00:00:00", format),
        afterTime = moment("22:30:01", format);
      console.log("moment", now.isBetween(beforeTime, afterTime));
      if (now.isBetween(beforeTime, afterTime)) {
        console.log(JSON.stringify(this.disabledList));
        console.log("data: ", this.tableData);
        let props = [];
        for (let i in this.tableData) {
          props.push({
            username: this.$auth.user.username,
            date: moment().format("YYYY-MM-DD"),
            itemId: this.options.find(x => x.label == this.tableData[i].name)
              .value,
            item: this.tableData[i].name,
            send: this.tableData[i].send,
            recive: this.tableData[i].recive,
            out: this.tableData[i].out
          });
        }
        const filterProps = props.filter(x => x.out + x.send + x.recive > 0);
        console.log("props", props);
        if (filterProps && filterProps.length > 0) {
          const save = this.$axios
            .$post("statement/saveall", filterProps)
            .then(res => {
              console.log("res", res);
              this.$notify({
                title: "บันทึกข้อมูลสำเร็จ",
                message: "ข้อมูลได้ถูกส่งเรียบร้อยแล้ว",
                type: "success"
              });
            });
        }
        const config = this.$axios.$post("config/create", props).then(res => {
          console.log("config", res);
        });
      } else {
        this.$message.error("ไม่สามารถส่งข้อมูลหลัง 08.30 น. ได้");
      }
    }
  }
};
</script>
<style lang=""></style>
