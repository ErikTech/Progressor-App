<template>
  <div class="dayview">
    <h1 text-center>Day View</h1>
    <chart-container :taskItems="taskItems"></chart-container>
    <add-task-item></add-task-item>
    <task-list :taskItems="taskItems"></task-list>
  </div>
</template>

<script>
import ChartContainer from '../chartContainer.vue';
import AddTaskItem from './AddTaskItem.vue';
import TaskList from "./TaskList.vue";

export default {
  components: { TaskList, ChartContainer, AddTaskItem },
  name: "DayView",
  computed: {
  taskItems() {
      return this?.$store?.getters?.allTaskItems || [];
  },
  dailies() {
      return this?.$store?.getters?.dailies|| [];
  },
  todayTasks() {
      return this?.$store?.getters?.todayTasks || [];
  },
},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.dayview
  border: 1px solid red
</style>
