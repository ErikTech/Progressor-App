<template>
    <div class="dayview">
        <v-row>
            <v-col cols="6">
                <v-btn v-if="showBackOneDayButton" @click="goBackOneDay">
                    <v-icon color="grey lighten-1" style="padding-right: 10px">mdi-arrow-left</v-icon>
                    {{ backOneDay }}
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn v-if="showForwardOneDayButton" @click="goForwardOneDay">
                    {{ forwardOneDay }}
                    <v-icon color="grey lighten-1" style="padding-right: 10px">mdi-arrow-right</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    
        <h1 text-center>Day View - {{ selectedDate }}</h1>
        <division-chart :selectedDayTasks="selectedDayTasks"></division-chart>
        <chart-container :selectedDayTasks="selectedDayTasks"></chart-container>
        <task-list @showAddTaskModal="toggleAddTaskModal" :selectedDayTasks="selectedDayTasks"></task-list>
      
    <v-dialog
      v-if="showAddTaskModal"
      v-model="showAddTaskModal"
      persistent
    
    >
      <v-card>
        <v-card-title class="headline">
         Add new Task
        </v-card-title>

        <!-- <v-card-text>
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        </v-card-text> -->
        <add-task-item @closeModal="toggleAddTaskModal"></add-task-item>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="showAddTaskModal = false"
          >
            close
          </v-btn>

        
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
import ChartContainer from "../chartContainer.vue";
import DivisionChart from '../divisionChart.vue';
import AddTaskItem from "./AddTaskItem.vue";
import TaskList from "./TaskList.vue";

export default {
    components: { TaskList, ChartContainer, AddTaskItem, DivisionChart },
    name: "DayView",
    data: () => {
        return {
            // selectedDate: ''
            showAddTaskModal: false
        };
    },
    computed: {
        todaysDate() {
            return this.$store.getters.todaysDate || this.$moment().format('MM/DD/YYYY');
        },
        backOneDay() {
            return this.$moment(this.selectedDate)
                .subtract(1, "days")
                .format("MM/DD/YYYY");
        },
        forwardOneDay() {
            return this.$moment(this.selectedDate)
                .add(1, "days")
                .format("MM/DD/YYYY");
        },
        showBackOneDayButton() {
            return this?.$store?.getters?.getTasksByDate(this.backOneDay);
        },
        showForwardOneDayButton() {
            return this?.$store?.getters?.getTasksByDate(this.forwardOneDay);
        },
        selectedDate: {
            get() {
                console.log(this.$store.getters.selectedViewableDate);
                return this.$store.getters.selectedViewableDate || this.todaysDate;
            },
            set(date) {
                this.$store.dispatch(
                    "setViewableDate",
                    this.$moment(date).format("MM/DD/YYYY")
                );
            },
        },
        taskItems() {
            return this.selectedDayTasks.taskList || [];
        },
        dailies() {
            console.log(this?.$store?.getters?.dailies)
            return this?.$store?.getters?.dailies.filter(task => task.repeat === "Daily") || [];
        },
        selectedDayTasks() {
            console.log("runs");
            // console.log(this.$store.getters.getTasksByDate(this.selectedDate));
            return (
                this?.$store?.getters?.getTasksByDate(this.selectedDate) || {}
            );
        },
        todaysTasks() {
            return (
                this?.$store?.getters?.getTasksByDate(this.todaysDate) || {}
            );
        },
        // SelectedDayDailies() {
        //     return this.todaysTasks.taskList.filter(task => task.repeat === "Daily") || [];
        // }
    },
    methods: {
      toggleAddTaskModal(){
        this.showAddTaskModal = !this.showAddTaskModal;
      },
        changeDate(chosenDate) {
            console.log("Going to Date: " + chosenDate);
            this.selectedDate = chosenDate;
        },
        goBackOneDay() {
            this.changeDate(this.$moment(this.selectedDate).subtract(1, "days"));
        },
        goForwardOneDay() {
            this.changeDate(this.$moment(this.selectedDate).add(1, "days"));
        },
        addDailiesToToday() {
          console.log(this.todaysTasks)
            this.dailies.forEach(element => {
                if (!this.todaysTasks.taskList.some(task => task.repeatRef === element.repeatRef ) ) {
                    console.log("does not contain" + element.repeatRef)
                    this.$store.dispatch('addTask', element)
                }
            });
        }
    },
    async mounted() {
        await this.$store.dispatch(
            "setTodaysDate",
            this.$moment().format("MM/DD/YYYY")
        );
        this.selectedDate = this.todaysDate;
        console.log(this.todaysTasks)
        await this.addDailiesToToday();


    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.dayview {
  border: 1px solid red;
}
</style>
