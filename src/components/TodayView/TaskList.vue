<template>
  <v-list>
    <div class="tasklist">
      <v-subheader>Today Tasks</v-subheader>
      <v-list-item-group multiple active-class="">
        <task-item
          v-for="(task, index) in todayTasks"
          v-bind:key="index"
          :task="task"
          @removeTask="removeTask"

        ></task-item>
      </v-list-item-group>
    </div>
    <div class="tasklist dailies">
      <v-subheader>Daily Tasks</v-subheader>
      <v-list-item-group  multiple active-class="">
        <task-item
          v-for="(task, index) in dailies"
          v-bind:key="index"
          :task="task"
          @remove-task="removeTask"
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
  
  }),
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
  methods: {
    removeTask(task){
        console.log(task.id);
        this.$store.dispatch('removeTask', task.id)
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.tasklist {
  border: 1px solid blue;
}
</style>
