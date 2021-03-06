<template>
  <v-list>
    <div class="tasklist">
      <v-subheader>Today Tasks</v-subheader>
      <v-list-item-group v-model="todayTasks" multiple active-class="">
        <task-item
          v-for="(task, index) in todayTasks"
          v-bind:key="index"
          :task="task"
        ></task-item>
      </v-list-item-group>
    </div>
    <div class="tasklist dailies">
      <v-subheader>Daily Tasks</v-subheader>
      <v-list-item-group v-model="dailies" multiple active-class="">
        <task-item
          v-for="(task, index) in dailies"
          v-bind:key="index"
          :task="task"
        ></task-item>
      </v-list-item-group>
    </div>
  </v-list>
</template>

<script>
import TaskItem from "./TaskItem.vue";
export default {
  components: { TaskItem },
  name: "TaskList",
  data: () => ({
    taskItems: [
      {
        task: "Do your homework",
        tag: "work",
        repeat: null,
      },
      {
        task: "Do your homework 2",
        tag: "work",
        repeat: null,
      },
      {
        task: "make your bed",
        tag: "home",
        repeat: "daily",
      },
    ],
  }),
  computed: {
    dailies() {
      return this.taskItems.filter((task) => {
        return task.repeat === "daily";
      });
    },
    todayTasks() {
      return this.taskItems.filter((task) => {
        return task.repeat === null;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.tasklist {
  border: 1px solid blue;
}
</style>
