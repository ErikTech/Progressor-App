<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="12"
        >
          <v-text-field
            v-model="taskName"
            label="Task Name"
            filled
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn @click="addTask">Add</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "AddTask",
  data: () => ({
    taskName: ''
  }),
  methods: {
    addTask(){
      console.log(this.taskName)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.taskitem
  border: 1px solid green
</style>
