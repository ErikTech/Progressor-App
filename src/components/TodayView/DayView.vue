<template>
  <div class="dayview">
    Day View
    <chart-container></chart-container>
    <task-list></task-list>
  </div>
</template>

<script>
import ChartContainer from '../chartContainer.vue';
import TaskList from "./TaskList.vue";

export default {
  components: { TaskList, ChartContainer },
  name: "DayView"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.dayview
  border: 1px solid red
</style>
