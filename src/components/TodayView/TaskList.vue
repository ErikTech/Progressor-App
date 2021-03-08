<template>
  <v-list>
    <div class="tasklist">
      <v-subheader><v-btn @click.stop="showAddTaskModal">Add</v-btn>{{selectedDayTasks.date}} Tasks</v-subheader>
      <v-list-item-group multiple active-class="">
        <task-item
          v-for="(task, index) in nonRepeatTasks"
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
          v-for="(task, index) in selectedDayDailies"
          v-bind:key="index"
          :task="task"
          @removeTask="removeTask"
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
  props: {    
    // taskItems: Array,
    selectedDayTasks: Object,
    // dailies: Array
  },
//   data: () => ({
//       showAddTaskModal: false
//   }),
  computed: {
    taskItems() {
        console.log(this.selectedDayTasks)
        return this?.selectedDayTasks?.taskList || [];
    },
    // dailies() {
    //   console.log(this.taskItems)
    //   return this.taskItems.filter(task => task.repeat === "Daily");
    // },
    selectedDayDailies() {
        return this.taskItems.filter(task => task.repeat === "Daily") || [];
    },
    nonRepeatTasks() {
        console.log(this.taskItems)
        return this.taskItems.length > 0 ? this.taskItems.filter(task => task.repeat === "Never") : [];
    },
  },
  methods: {
    showAddTaskModal(){
        this.$emit('showAddTaskModal');
    },
    removeTask(task){
        console.log(task.id);
        const taskIdentifier = {
            date: this.selectedDayTasks.date,
            id: task.id
        }
        this.$store.dispatch('removeTask', taskIdentifier)
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
// .tasklist {
//   border: 1px solid blue;
// }
</style>
