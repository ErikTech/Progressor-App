<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: {
    // data: Object,
    options: Object,
  },
  watch: {
    // chartData(){
    //   console.log(this.$data._chart)
    //   this.$data._chart.update();

    // }
    // chartData: {
    //     deep: true,
    //     handler() {
    //       // this.$data._chart.update();
    //       this.renderChart(this.chartData, this.options);
    //     },
    //   },
  },
  // computed:{
      // chartData(){
      //     return this.data;
      // }
  // },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    // console.log(this.chartData)
    this.renderChart(this.chartData, this.options);
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