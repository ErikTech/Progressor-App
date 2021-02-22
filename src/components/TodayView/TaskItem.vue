<template>
    <v-list-item two-line>
        <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{task.task}}</v-list-item-title>
              <v-list-item-subtitle>{{task.tag}}</v-list-item-subtitle>
            </v-list-item-content>
          </template>
    </v-list-item>
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
