<template lang="th">
  <div>
    <TableAll :tableData="tableData" :statement="statement" :user="allUsers" />
  </div>
</template>
<script>
import moment from "moment";

export default {
  layout: "left",
  data() {
    return {
      allData: [],
      table: [],
      statement: []
    };
  },
  async asyncData({ app }) {
    try {
      const all = await app.$axios.$get("statement/all");
      const users = await app.$axios.$get("user", {
        baseURL: "https://hpls.herokuapp.com"
      });
      return {
        allData: all,
        allUsers: users
      };
    } catch (error) {}
  },
  created() {
    this.$store.commit("closemenu");
    for (let i in this.allData) {
      if (i == 0) {
        this.table.push({
          date: this.allData[i].date,
          username: this.allData[i].username,
          send: this.allData[i].send
        });
      } else if (
        this.allData[i].date == this.allData[i - 1].date &&
        this.allData[i].username == this.allData[i - 1].username
      ) {
        this.table.find(x => {
          return (
            x.date == this.allData[i].date &&
            x.username == this.allData[i].username
          );
        }).send += this.allData[i].send;
        // console.log('aaaa==..',a);
      } else {
        this.table.push({
          date: this.allData[i].date,
          username: this.allData[i].username,
          send: this.allData[i].send
        });
      }
    }
    // console.log("table", this.table);
    const data = [{}];
    let index = 0;
    let sum = 0;
    this.allData.forEach((v, i) => {
      if (i == 0) {
        data[index] = { date: moment(v.date).format("DD/MM/YYYY") };
      } else if (this.allData[i - 1].date != v.date) {
        data[index].sum = sum;
        index += 1;
        sum = 0;
        data[index] = { date: moment(v.date).format("DD/MM/YYYY") };
      }
      data[index][v.username] = v.t_send;
      sum += v.t_send;
    });
    this.statement = data;
    console.log("statement", this.statement);
  },
  computed: {
    UserData() {
      const data = [];
      this.allUsers.forEach(v, i => {
        console.log("v".v);
        console.log("i", i);
      });
    },
    tableData() {
      const data = [];

      for (var i = 0; i < 30; i++) {
        data.push({
          date: moment()
            .add(-i, "days")
            .format("YYYY/MM/DD"),
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
