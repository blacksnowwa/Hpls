<template>
  <div>
    <!-- <el-button @click="addRow">Add</el-button>
    <el-button @click="saveAll">Save All</el-button> -->
    <el-table
      :data="statement"
      :default-sort="{ prop: 'date', order: 'descending' }"
      border
      :summary-method="getSummaries"
      show-summary
      style="width: 100%"
    >
      <el-table-column prop="date" label="วันที่/แผนก" width="130" sortable>
        <template slot-scope="scope">
          <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row.date"
            controls-position="right"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        v-for="item in user"
        :key="item.id"
        :prop="item.username"
        :label="item.username"
        width="80"
      >
        <template slot-scope="scope">
          <!-- <el-input
            size="small"
            style="text-align:center"
            v-model="scope.row[item.username]"
            :disabled="scope.$index < addCount"
          ></el-input> -->
          {{ scope.row[item.username] || 0 }}
        </template>
      </el-table-column>
      <el-table-column prop="sum" label="ยอดรวม" width="80"> </el-table-column>

      <el-table-column label="ตัวจัดการ" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="saveRow(scope.$index, scope.row)"
            type="text"
            size="small"
          >
            รายงาน
          </el-button>
          <!-- <el-button
            @click.native.prevent="deleteRow(scope.$index, scope.row)"
            type="text"
            size="small"
          >
            Delete
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["tableData", "statement", "user"],
  data() {
    return {
      addCount: 0
    };
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "Total Cost";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    },
    deleteRow(index, rows) {
      this.tableData.splice(index, 1);
      if (this.addCount > 0) --this.addCount;
    },
    saveRow(index, rows) {
      //  api
      const date = moment(rows.date, "DD/MM/YYYY").format("YYYY-MM-DD");
      console.log("rows", date);
      this.$router.push(`/report/${date}`);
    },
    addRow: function() {
      var d = new Date();
      var n = d.toLocaleDateString();
      let newRow = {
        date: n,
        state: "2",
        zip: "32"
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
