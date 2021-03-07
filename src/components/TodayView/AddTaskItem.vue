<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="6"
          sm="6"
        >
          <v-text-field
            v-model="taskName"
            label="Task Name"
            filled
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn @click="addTask">Add</v-btn>
        </v-col>
           <v-col
        class="d-flex"
        cols="5"
        sm="5"
      >
        <v-select
          v-model="category"
          :items="categories"
          label="Category"
        ></v-select>
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
    category: '',
    repeatStatus: null,
  }),
  computed: {
    categories(){
      return ['Work','Home','Fitness','Dev','Learn']
    }
  },
  methods: {
    addTask(){
      const taskInfo = {
        task: this.taskName,
        category: this.category,
        repeat: this.repeatStatus
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
