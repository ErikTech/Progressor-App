<template>
  <div class="dayview">
    Day View
    <chart-container></chart-container>
    <add-task-item></add-task-item>
    <task-list></task-list>
  </div>
</template>

<script>
import ChartContainer from '../chartContainer.vue';
import AddTaskItem from './AddTaskItem.vue';
import TaskList from "./TaskList.vue";

export default {
  components: { TaskList, ChartContainer, AddTaskItem },
  name: "DayView"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.dayview
  border: 1px solid red
</style>
