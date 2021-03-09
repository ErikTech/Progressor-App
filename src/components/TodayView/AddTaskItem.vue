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
          :item-text="category =>`${category.name}`" 
          return-object

        >
        <template>

        </template>
        </v-select>
   
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
      <v-row v-if="customCategorySelected">
        <v-col>
              <v-text-field
            v-model="newCategoryName"
            label="New Category"
            filled
          ></v-text-field>
        </v-col>
        <v-col>
          <v-color-picker
            class="ma-2"
            swatches-max-height="200px"
            v-model="customCategoryColor"
          ></v-color-picker>
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
    category: {name: '', color: ''},
    repeatStatus: 'Never',
    newCategoryName: '',
    customCategoryOption: '+ Add New',
    customCategoryColor: '#ffffff'
    
  }),
  computed: {
    categories(){
      // console.log(this.$store.getters.getAllCategories)
      return [...this.$store.getters.getAllCategories, {name: this.customCategoryOption, color: ''}]
    },
    repeatOptions(){
      return ['Never','Daily','Weekly','Monthly']
    },
    buttonDisabled(){
      return !this.taskName.length > 0 || (this.category.name === this.customCategoryOption && this.newCategoryName === '');
    },
    customCategorySelected(){
      console.log(this.category)
      return this.category.name === this.customCategoryOption;
    }
  },
  methods: {
    addTask(){
      let customCategory = {};
      if(this.customCategorySelected){
        customCategory = {name: this.newCategoryName, color: this.customCategoryColor};
        this.$store.dispatch('addNewCategory', customCategory)
      }
      const taskInfo = {
        task: this.taskName,
        category: this.customCategorySelected ? customCategory : this.category,
        repeat: this.repeatStatus,
        date: this.$store.getters.selectedViewableDate
      }
      this.$store.dispatch('addTask', taskInfo)
      this.$emit('closeModal');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.taskitem
  border: 1px solid green
</style>
