<template>
  <v-list>
    <div class="tasklist">
        <v-list-item-content v-if="!(nonRepeatTasks.length > 0)">
            <v-subheader>
              <v-btn
                @click.stop="showAddTaskModal"
                icon
                style="padding-right: 10px"
              >
                <v-icon color="grey darken-2"
                  >mdi-shape-square-plus</v-icon
                > </v-btn
              >{{ selectedDayTasks.date }} Tasks</v-subheader
            >
          </v-list-item-content>
      <v-list-group v-else multiple active-class="" :value="true">
          
        <template  v-slot:activator>
          <v-list-item-content>
            <v-subheader>
              <v-btn
                @click.stop="showAddTaskModal"
                icon
                style="padding-right: 10px"
              >
                <v-icon color="grey darken-2"
                  >mdi-shape-square-plus</v-icon
                > </v-btn
              >{{ selectedDayTasks.date }} Tasks</v-subheader
            >
          </v-list-item-content>
        </template>
        <!-- <task-item v-if="!(nonRepeatTasks.length > 0)"></task-item> -->
        <task-item
          v-for="(task, index) in nonRepeatTasks"
          v-bind:key="index"
          :task="task"
          @removeTask="removeTask"
        ></task-item>
      </v-list-group>
    </div>
    <v-divider></v-divider>

    <div class="tasklist dailies" v-if="selectedDayDailies.length > 0">
      <v-list-group multiple active-class="" :value="true">
        <template v-slot:activator>
          <v-list-item-content>
            <v-subheader>
              <v-btn
                @click.stop="showAddTaskModal"
                icon
                style="padding-right: 10px"
              >
                <v-icon color="grey darken-2"
                  >mdi-shape-square-plus</v-icon
                > </v-btn
              >Daily Tasks</v-subheader
            >
          </v-list-item-content>
        </template>
        <task-item
          v-for="(task, index) in selectedDayDailies"
          v-bind:key="index"
          :task="task"
          @removeTask="removeTask"
        ></task-item>
      </v-list-group>
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
    //   console.log(this.selectedDayTasks);
      return this?.selectedDayTasks?.taskList || [];
    },
    // dailies() {
    //   console.log(this.taskItems)
    //   return this.taskItems.filter(task => task.repeat === "Daily");
    // },
    selectedDayDailies() {
      return this.taskItems.filter((task) => task.repeat === "Daily") || [];
    },
    nonRepeatTasks() {
    //   console.log(this.taskItems);
      return this.taskItems.length > 0
        ? this.taskItems.filter((task) => {
            return !this.selectedDayDailies.includes(task)
        })
        : [];
    },
  },
  methods: {
    showAddTaskModal() {
      this.$emit("showAddTaskModal");
    },
    removeTask(task) {
      console.log(task.id);
      const taskIdentifier = {
        date: this.selectedDayTasks.date,
        id: task.id,
      };
      this.$store.dispatch("removeTask", taskIdentifier);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
// .tasklist {
//   border: 1px solid blue;
// }
</style>
