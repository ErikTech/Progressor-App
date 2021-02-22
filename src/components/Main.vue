<template>
  <div class="hello">
    <day-view></day-view>
  </div>
</template>

<script>
import DayView from './TodayView/DayView.vue';
export default {
  components: { DayView },
  name: "Main"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
