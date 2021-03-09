<template>
  <div class="main-container">
    <v-row>
      <v-col class="chartCol"
        :cols="12 / chartObjects.length"
        v-for="(chartObject, index) in chartObjects"
        :key="'chartcol' + index"
      >
        <pie-chart
          :data="chartObject.data"
          :options="chartObject.options"
        ></pie-chart>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PieChart from "./chart.vue";

export default {
  name: "MainChartContainer",
  components: {
    PieChart,
  },
  props: {
    selectedDayTasks: Object,
  },
  data: () => ({
    // loaded: false,
    chartOptions: {
      hoverBorderWidth: 20,
      title: {
        display: true,
        text: "Today's completed tasks",
      },
    },
  }),
  computed: {
    loaded() {
      return this.taskItems.length > 0;
    },
    taskItems() {
      return this?.selectedDayTasks?.taskList || [];
    },
    chartDataSets() {
      let datasets = [];

      if (this.loaded) {
        // get all categories
        const currentCategories = this.taskItems.map((task) => {
          return task.category;
        });

          let removeDuplicateCategories = new Map(currentCategories.map(item=>{
            return [item.name,item]
        }));
    let reducedCategoryList = [...removeDuplicateCategories.values()]
    console.log(reducedCategoryList)

        // Count completed points
        let pts = [];
        reducedCategoryList.forEach((element) => {
          let totalCount = 0;
          let completedCount = 0;
          console.log(this.taskItems)
          console.log(element)
          this.taskItems.forEach((task) => {
            if (task.category.name === element.name) {
              totalCount++;
              if (task.completed) {
                completedCount++;
              }
            }
          });
          pts.push({
            category: element,
            total: totalCount,
            incomplete: totalCount - completedCount,
            completed: completedCount,
          });
        });
    console.log(pts)
        // Build Datasets
        pts.forEach((taskSet) => {
            console.log(taskSet)
          const set = {
            label: taskSet.category.name,
            backgroundColor: [taskSet.category.color, "#ced3e1"],
            data: [taskSet.completed, taskSet.incomplete],
          };
          datasets.push(set);
        });
      }

      return datasets;
    },
    chartObjects() {
      let chartObjects = [];
      if (this.chartDataSets.length > 0) {
          console.log(this.chartDataSets)
        for (const set in this.chartDataSets) {
            console.log(set)
          let chartObject = {
            data: {
              hoverBackgroundColor: "red",
              hoverBorderWidth: 10,
              labels: ["Completed", "Incomplete"],
              datasets: [this.chartDataSets[set]],
            },
            options: {
              hoverBorderWidth: 20,
              title: {
                display: true,
                text: this.chartDataSets[set].label,
              },
            },
          };
          chartObjects.push(chartObject);
        }
      }
      return chartObjects;
    },
  }
};
</script>

<style lang="stylus">
.chart-container {
  // max-height: 100px
  margin: 0 auto;
  width: 200px;
}
</style>