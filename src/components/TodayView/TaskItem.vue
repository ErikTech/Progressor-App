<template>
    <v-list-item two-line>
        <!-- <template v-slot:default="{ active }"> -->
            <v-list-item-action>
              <v-checkbox v-model="task.completed" ></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{task.task}} - {{task.id}} </v-list-item-title>
              <v-list-item-subtitle :style="`color: ${task.category.color}`">{{task.category.name}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn icon @click="removeTask">
                    <v-icon color="grey lighten-1">mdi-close-box</v-icon>
                </v-btn>
            </v-list-item-action>
          <!-- </template> -->
     
    </v-list-item>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: Object
  },
  mounted(){
    //   console.log(this.task)
  },
  methods: {
    removeTask(){
        // console.log("test")
        console.log(this.task)
        this.$emit('removeTask', this.task)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
