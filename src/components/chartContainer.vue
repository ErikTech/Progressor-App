<template>
  <div class="chart-container">
    <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
  </div>
</template>

<script>
import PieChart from "./chart.vue";

export default {
  name: 'PieChartContainer',
   components: {
    PieChart
  },
  data: () => ({
    loaded: false,
     chartOptions: {
        hoverBorderWidth: 20
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Green", "Red", "Blue"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [1, 10, 5]
          }
        ]
      }
  }),
  async mounted () {
    this.loaded = false
    try {
    //   const { userlist } = await fetch('/api/userlist')
    //   this.chartdata = userlist
      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
<style lang="stylus">
.chart-container {
    // max-height: 100px
    margin: 0 auto;
    width: 200px;
}
</style>