<template>
  <div class="dayview">
    Day View
    <task-list></task-list>
  </div>
</template>

<script>
import TaskList from "./TaskList.vue"

export default {
  components: { TaskList },
  name: "DayView"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.dayview 
  border: 1px solid red
</style>
