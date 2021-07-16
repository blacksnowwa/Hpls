<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix flex justify-between">
      <h1 class="text-2xl">
        จัดการผ้า<font-awesome-icon class="ml-2" :icon="['fas', 'tshirt']" />
      </h1>
      <div>
        <el-button type="primary" icon="el-icon-circle-plus" @click="add"
          >เพิ่มข้อมูล</el-button
        >

        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="ชื่อ" :label-width="formLabelWidth">
              <el-input v-model="form.Name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="Confirm">Confirm</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <el-table
      :data="tableData"
      v-loading.fullscreen.lock="load"
      element-loading-text="กำลังโหลด..."
      element-loading-spinner="el-icon-loading"
      stripe
      style="width: 100%"
    >
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
            @click.native.prevent="edit(scope.$index, scope.row)"
            size="small"
          >
            แก้ไข
          </el-button>
          <el-popconfirm
            confirm-button-text="ยืนยัน"
            cancel-button-text="ไม่ลบ"
            icon="el-icon-info"
            icon-color="red"
            title="ยืนยันที่จะลบข้อมูลนี้หรือไม่ ?"
            @confirm="deleteRow(scope.$index, scope.row)"
          >
            <!-- @click.native.prevent="deleteRow(scope.$index, scope.row)" -->
            <el-button
              slot="reference"
              type="danger"
              round
              plain
              icon="el-icon-delete"
              size="small"
            >
              ลบข้อมูล
            </el-button>
          </el-popconfirm>
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
      load: false,
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      action: "",
      editId: 0,
      form: {
        Name: ""
      },
      dialogTitle: "เพิ่มรายการผ้า"
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
      this.load = true;
      this.$axios
        .post("items/delete", { id: rows.id })
        .then(res => {
          if (res.status == 200) {
            this.tableData.splice(index, 1);
            this.$notify({
              title: "ลบข้อมูลสำเร็จ",
              message: `Id = ${rows.id} Name = ${rows.Name} ได้ถูกลบเรียลร้อยแล้ว`,
              type: "success"
            });
            if (this.addCount > 0) --this.addCount;
          } else {
            this.$notify({
              title: "เกิดข้อผิดพลาด",
              message: `ไม่สามารถลบข้อมูลได้`,
              type: "Error"
            });
          }
            this.load = false;
        })
        .catch(err => {
          this.load = false;
        });
    },
    notify(title, mes, type) {
      this.$notify({
        title: title,
        message: mes,
        type: type
      });
    },
    add() {
      this.dialogTitle = "เพิ่มรายการ";
      this.action = "add";
      this.dialogFormVisible = true;
    },
    edit(index, row) {
      this.form.Name = row.Name;
      this.dialogTitle = "แก้ไขรายการ";
      this.action = "edit";
      this.dialogFormVisible = true;
      this.editId = row.id;
    },
    initForm() {
      this.form = {
        Name: ""
      };
    },
    Confirm() {
      this.load = true
      if (this.action == "add") {
        this.$axios.post("items/create", this.form).then(res => {
          if (res.status == 200) {
            this.tableData.push(res.data);
            this.initForm();
            this.$notify({
              title: "เพิ่มข้อมูลสำเร็จ",
              message: `Id = ${res.data.id} Name = ${res.data.Name}`,
              type: "success"
            });
            this.load = false
          }
        });
      } else if (this.action == "edit") {
        let obj = {
          id: this.editId,
          Name: this.form.Name
        };
        this.$axios.post("items/update", obj).then(res => {
          if (res.status == 200 && res.data == 1) {
            let index = this.tableData.findIndex(x => x.id == this.editId);
            this.tableData[index].Name = this.form.Name;
            this.$notify({
              title: "แก้ไขข้อมูลสำเร็จ",
              message: `Id = ${this.editId} Name = ${this.form.Name}`,
              type: "success"
            });
          } else {
            this.$notify({
              title: "เกิดข้อผิดพลาด",
              message: `ไม่สามารถแก้ไขข้อมูลได้`,
              type: "Error"
            });
          }
          this.load = false
        });
      }
      this.dialogFormVisible = false;
    }
  }
};
</script>
