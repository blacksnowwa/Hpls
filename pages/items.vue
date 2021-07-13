<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix flex justify-between">
      <h1 class="text-2xl">
        จัดการผ้า<font-awesome-icon class="ml-2" :icon="['fas', 'tshirt']" />
      </h1>
      <div>
        <el-button type="primary" icon="el-icon-circle-plus" @click="addRow"
          >Add</el-button
        >
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="Name" label="ชื่อ" width="180"> </el-table-column>
      <el-table-column prop="created_at" label="วันที่สร้าง"> </el-table-column>
      <el-table-column align="center" label="จัดการ" width="240">
        <template slot-scope="scope">
          <!-- <el-button
            @click.native.prevent="saveRow(scope.$index, scope.row)"
            type="text"
            size="small"
          >
            Save
          </el-button> -->
          <el-button
            type="warning"
            round
            plain
            icon="el-icon-edit"
            size="small"
          >
            Edit
          </el-button>
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
  </el-card>
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
      const table = await app.$axios.$get("items");
      return {
        tableData: table
      };
    } catch (error) {}
  },
  computed: {
    // dataFilter() {
    //   return this.tableData
    //     .filter(x => x.date == moment().format("YYYY-MM-DD"))
    //     .map(x => {
    //       x.date = moment(x.date, "YYYY-MM-DD").format("DD/MM/YYYY");
    //       return x;
    //     });
    //   // .sort(function(a, b){return a.username - b.username});
    // }
  },
  methods: {
    deleteRow(index, rows) {
      console.log("123");
      this.tableData.splice(index, 1);
      if (this.addCount > 0) --this.addCount;
    }
  }
};
</script>
