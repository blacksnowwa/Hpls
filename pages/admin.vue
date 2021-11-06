<template>
  <div>
    <el-table :data="dataFilter" stripe style="width: 100%">
      <el-table-column prop="date" label="วันที่" width="180">
      </el-table-column>
      <el-table-column prop="username" label="ห้อง" width="180">
      </el-table-column>
      <el-table-column prop="item" label="รายการ"> </el-table-column>
      <el-table-column prop="send" label="ส่ง"> </el-table-column>
      <el-table-column prop="recive" label="รับ"> </el-table-column>
      <el-table-column prop="out" label="ค้าง"> </el-table-column>
      <el-table-column label="จัดการ" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="editRow(scope)"
            type="warning"
            round
            plain
            icon="el-icon-edit"
            size="small"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="แก้ไข" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="วันที่" :label-width="formLabelWidth">
          <el-input v-model="form.date" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="ห้อง" :label-width="formLabelWidth">
          <el-input v-model="form.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="รายการ" :label-width="formLabelWidth">
          <el-input v-model="form.item" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="ส่ง" :label-width="formLabelWidth">
          <el-input v-model="form.send"></el-input>
        </el-form-item>
        <el-form-item label="รับ" :label-width="formLabelWidth">
          <el-input v-model="form.recive"></el-input>
        </el-form-item>
        <el-form-item label="ค้าง" :label-width="formLabelWidth">
          <el-input v-model="form.out"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSaveEdit">Confirm</el-button>
      </span>
    </el-dialog>
    <el-table id="admin" :data="dataFilter" stripe style="width: 100%">
      <el-table-column prop="date" label="วันที่" width="180">
      </el-table-column>
      <el-table-column prop="username" label="ห้อง" width="180">
      </el-table-column>
      <el-table-column prop="item" label="รายการ" width="340">
      </el-table-column>
      <el-table-column prop="send" label="ส่ง" width="140"> </el-table-column>
      <el-table-column prop="recive" label="เบิก" width="140">
      </el-table-column>
      <el-table-column prop="out" label="ค้าง" width="140"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from "moment";
export default {
  layout: "guyza55",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px"
    };
  },
  async asyncData({ app }) {
    try {
      const table = await app.$axios.$get("statement");
      return {
        tableData: table.map(x => {
          x.date = moment(x.date).format("YYYY-MM-DD");
          return x;
        })
      };
    } catch (error) {}
  },
  methods: {
    editRow({ row, $index }) {
      console.log("scope", row, $index);
      this.form = row;
      this.form.title = row.username;
      this.dialogFormVisible = true;
    },
    handleSaveEdit() {
      const props = Object.assign({}, this.form, {
        date: moment(this.form.date, "DD/MM/YYYY").format("YYYY-MM-DD")
      });
      console.log("props", props);

      this.$axios.$post("statement/saveall", [props]).then(res => {
        console.log("res", res);
        this.$notify({
          title: "บันทึกข้อมูลสำเร็จ",
          message: "ข้อมูลได้ถูกส่งเรียบร้อยแล้ว",
          type: "success"
        });
        this.dialogFormVisible = false;
      });
    }
  },
  computed: {
    dataFilter() {
      return this.tableData
        .filter(x => x.date == moment().format("YYYY-MM-DD"))
        .map(x => {
          x.date = moment(x.date, "YYYY-MM-DD").format("DD/MM/YYYY");
          return x;
        });
      // .sort(function(a, b){return a.username - b.username});
    }
  }
};
</script>
