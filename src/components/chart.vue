<script>
import { Doughnut } from "vue-chartjs";
export default {
  extends: Doughnut,
  props: {
    data: Object,
    options: Object,
  },
  watch: {
    chartData: {
        deep: true,
        handler() {
          this.renderChart(this.chartData, this.options);
        },
      },
  },
  computed:{
      chartData(){
          return this.data;
      }
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.data, this.options);
  },
  //   updated(){
  // this.renderChart(this.data, {
  //       borderWidth: "10px",
  //       hoverBackgroundColor: "red",
  //       hoverBorderWidth: "10px"
  //     });
  //   }
};
</script>