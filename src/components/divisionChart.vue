<template>
  <div class="chart-container">
    <pie-chart v-if="chartData.data" :chartData="chartData.data" :options="chartData.options"></pie-chart>
  </div>
</template>

<script>
import PieChart from "./chart.vue";

export default {
  name: "DivisionChartContainer",
  components: {
    PieChart,
  },
  props: {
    // taskItems: Array,
    selectedDayTasks: Object,
  },
  data: () => ({
    // loaded: false,
    chartOptions: {
      hoverBorderWidth: 20,
      title: {
        display: true,
        text: "Today's task division",
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return (
              data["labels"][tooltipItem["index"]] +
              ": " +
              data["datasets"][0]["data"][tooltipItem["index"]] +
              "%"
            );
          },
        },
      },
    },
  }),
  computed: {
    loaded() {
    //   console.log(this.taskItems);
      return this.taskItems.length > 0;
    },
    taskItems() {
      return this?.selectedDayTasks?.taskList || [];
    },
    chartData() {
      let chartObject = {};

      if (this.loaded) {
        // get all categories
        const currentCategories = this.taskItems.map((task) => {
          return task.category;
        });

        let removeDuplicateCategories = new Map(currentCategories.map(item=>{
            return [item.name,item]
        }));
    let reducedCategoryList = [...removeDuplicateCategories.values()]

        // Count completed points
        let pts = [];
        // console.log(reducedCategoryList);
        reducedCategoryList.forEach((element) => {
          let totalCount = 0;
          this.taskItems.forEach((task) => {
            if (task.category === element) {
              totalCount++;
            }
          });
          pts.push(totalCount);
        });
        let totalPts = pts.reduce((a, b) => {
          return a + b;
        });
        let percentages = pts.map((num) => {
          return ((num / totalPts) * 100).toFixed(2);
        });
        // console.log(pts);
        // console.log(totalPts);
        // console.log(pts);
        // Build Datasets

        let catColors = [... new Set(reducedCategoryList.map(cat => cat.color))];
        let catNames = [...new Set(reducedCategoryList.map(cat => cat.name))];
        // console.log(reducedCategoryList)
        // console.log(catNames)


        const datasets = [
          {
            label: "a",
            backgroundColor: [
             ...catColors
            ],
            data: percentages,
          },
        ];
        //     datasets.push(set);
        // });

        // if (datasets.length > 0) {
        chartObject = {
            data: {
          hoverBackgroundColor: "red",
          hoverBorderWidth: 10,
          labels: [...catNames],
          datasets: datasets,
          },
          options: this.chartOptions
        };
        console.log(chartObject);
      }

      return chartObject;
    },
  },
  //   async mounted() {
  //     // try {

  //     // } catch (e) {
  //     //   console.error(e);
  //     // }
  //   },
};
</script>

<style lang="stylus">
.chart-container {
  // max-height: 100px
  margin: 0 auto;
  width: 200px;
}
</style>