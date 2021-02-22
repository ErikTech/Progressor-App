<template>
  <li class="taskitem">
    <div>{{task.task}}</div>
    <div>{{task.tag}}</div>
  </li>
</template>

<script>
export default {
  name: "Task",
   props: {
    task: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.taskitem
  border: 1px solid green
</style>
