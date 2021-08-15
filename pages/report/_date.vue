<template lang="">
  <div>
    <!-- <button @click="downloadWithCSS">Download PDF</button> -->
    <div class="p-8 text-2xl">วันที่ {{ $route.params.date }}</div>
    <div ref="content" class="report">
      <div class="section1">
        <ReportTable1 :table-data="tableData1" />
      </div>
      <div class="section1">
        <ReportTable1 :table-data="tableData2" />
      </div>
    </div>
  </div>
</template>
<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  layout: "left",
  data() {
    return {
      tableData1: [],
      tableData2: [],
      table: []
    };
  },
  created() {
    this.$axios
      .get("statement/report", {
        params: { date: this.$route.params.date }
      })
      .then(res => {
        this.table = res.data;
      });
    console.log("table", this.table);
    console.log("param", this.$route);
    // this.createPDF()
  },
  watch: {
    table(v) {
      this.splitData();
    }
  },
  methods: {
    // makePdf() {
    //   window.html2canvas = html2canvas;
    //   var doc = new jsPDF("p", "pt", "a4");
    //   doc.html(document.querySelector("#app"), {
    //     callback: function(pdf) {
    //       pdf.save("myPdf.pdf");
    //     }
    //   });
    // },
    download() {
      const doc = new jsPDF();
      const contentHtml = this.$refs.content.innerHTML;

      doc.html(contentHtml, {
        x: 150,
        y: 150,
        width: 170
      });

      doc.save("sample.pdf");
    },
    downloadWithCSS() {
      const doc = new jsPDF("p", "pt", "a4");
      /** WITH CSS */
      var canvasElement = document.createElement("canvas");
      html2canvas(this.$refs.content, { canvas: canvasElement }).then(function(
        canvas
      ) {
        const img = canvas.toDataURL("image/jpeg", 100);
        doc.addImage(img, "JPEG", 0, 0, 200, 200);
        doc.save("sample.pdf");
      });
    },
    createPDF() {
      let pdfName = "test";
      var doc = new jsPDF();
      doc.text("Hello World", 10, 10);
      doc.save(pdfName + ".pdf");
    },
    splitData() {
      let data1 = [];
      let data2 = [];
      const len = this.table.length;
      for (let i in this.table) {
        if (i < len / 2) {
          data1.push(Object.assign(this.table[i], { i: parseInt(i) + 1 }));
        } else {
          data2.push(Object.assign(this.table[i], { i: parseInt(i) + 1 }));
        }
      }
      this.tableData1 = data1;
      this.tableData2 = data2;
      console.log("1", this.tableData1);
      console.log("2", this.tableData2);
    }
  }
};
</script>
<style>
.report {
  display: flex;
}
.report .section1 {
  width: 50%;
  height: 100%;
}
</style>
