<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="8"
          sm="8"
        >
          <v-text-field
            v-model="taskName"
            label="Task Name"
            filled
          ></v-text-field>
        </v-col>
     
           <v-col
        class="d-flex"
        cols="3"
        sm="3"
      >
        <v-select
          v-model="category"
          :items="categories"
          label="Category"
        ></v-select>
           <v-select
          v-model="repeatStatus"
          :items="repeatOptions"
          label="Repeat"
        ></v-select>
      </v-col>
         <v-col cols="1">
          <v-btn :disabled="buttonDisabled" @click="addTask">Add</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "AddTask",
  data: () => ({
    taskName: '',
    category: 'Work',
    repeatStatus: 'Never'
  }),
  computed: {
    categories(){
      return ['Work','Home','Fitness','Dev','Learn']
    },
    repeatOptions(){
      return ['Never','Daily','Weekly','Monthly']
    },
    buttonDisabled(){
      return !this.taskName.length > 0
    }
  },
  methods: {
    addTask(){
      const taskInfo = {
        task: this.taskName,
        category: this.category,
        repeat: this.repeatStatus,
        date: this.$store.getters.selectedViewableDate
      }
      this.$store.dispatch('addTask', taskInfo)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.taskitem
  border: 1px solid green
</style>
