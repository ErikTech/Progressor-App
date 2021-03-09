import Vue from "vue";
import Vuex from "vuex";
import testTimeData from "../../tests/testTimeData.json"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    taskItems: [],
    taskDatabase: [], 
    selectedDate: '',
    todaysDate: '',
    dailyTasks: [],
    categories: []
  },
  mutations: {
    LOAD_USER_TASKS(state, payload){
      state.taskDatabase = payload.map(e => { 
        e.taskList = e.taskList.map(x => {
          x.id = parseInt(x.id);
          return x;
        });
        return e
      });
      console.log(state.taskDatabase.flat())
      let categoriesArray = state.taskDatabase.map(e => {
        let categories = e?.taskList ? e.taskList.map( task => {
          return task.category
        }) : [];
        return categories; 
      })
      console.log(categoriesArray.flat())
      const removeDuplicateCategories = new Map(categoriesArray.flat().map(item=>{
        return [item.name,item]
    }));
      const reducedCategoryList = [...removeDuplicateCategories.values()]
      // console.log(categoriesArray)
      state.categories = reducedCategoryList;
    },
    ADD_TASK(state, payload){
      state.taskDatabase = state.taskDatabase.map(taskListData => {
        if(taskListData.date === payload.dateCreated){
          taskListData.taskList.push(payload)
        }
        return taskListData;
      });
    },
    ADD_TO_DAILIES(state, payload){
      state.dailyTasks.push(payload)
    },
    REMOVE_TASK(state, payload){
      console.log(payload)
      state.taskDatabase = state.taskDatabase.map( task => {
        let arrayForDate = task;
        if(task.date === payload.date){
          let savedInfo = task.taskList.filter(specificTask => specificTask.id !== payload.id)
          arrayForDate = {...task, taskList: savedInfo};
        }
        return  arrayForDate;
      });
    },
    ADD_NEW_CATEGORY(state, payload){
      state.categories.push(payload)
    },
    SET_VIEWABLE_DATE(state, payload){
      state.selectedDate = payload;
    },
    SET_TODAYS_DATE(state, payload){
      state.todaysDate = payload;
    }
  },
  actions: {
    addTask({commit, getters, state}, payload){

      const newID = Math.max(getters.IDarray[getters.IDarray.length-1]) + 1;
      console.log(newID)
      const taskInfo = {
        ...payload,
        id: newID,
        repeatRef: payload.repeat === "Daily" ? payload.id : '',
        completed: false,
        dateCreated: state.todaysDate
      }
      commit('ADD_TASK', taskInfo);
    },
    removeTask({commit}, payload){
      console.log(payload)
      commit('REMOVE_TASK', payload);
    },
    addNewCategory({commit}, payload){
      commit('ADD_NEW_CATEGORY', payload);
    },
    loadUserTasks({commit, state}){
      const loadedTasks = testTimeData;
      console.log(loadedTasks)
      if(loadedTasks.some(e => e.date !== state.todaysDate)){
        let addTodayObject = {
          date: state.todaysDate,
          taskList: []
        }
        loadedTasks.push(addTodayObject)
      }
      
      commit('LOAD_USER_TASKS', loadedTasks);
    },
    setViewableDate({commit}, payload){
      commit('SET_VIEWABLE_DATE', payload)
    },
    setTodaysDate({commit}, payload){
      commit('SET_TODAYS_DATE', payload)
    }
  },
  getters: {
    IDarray(state){
      let IDarray = state.taskDatabase.map(e => {
        let ids = e.taskList.map( task => {
          return task.id
        })
        return ids;
      })
      return IDarray.flat();
    },
    allDailies(state){
      return state.dailyTasks;
    },
    allTaskItems(state){
      return state.taskItems;
    },
    dailies(state) {
      // if(state.taskDatabase.taskList.length > 0){
        let dailiesArray = state.taskDatabase.map(e => {
          let dailies = e?.taskList ? e.taskList.filter( task => {
            return task.repeat === "Daily"
          }) : [];
          return dailies;
        })
        return dailiesArray.flat();
      // }
      // return [];
    },
    getAllCategories(state) {
      return state.categories;
      // if(state.taskDatabase.taskList.length > 0){
        // let categoriesArray = state.taskDatabase.map(e => {
        //   let categories = e?.taskList ? e.taskList.map( task => {
        //     return task.category
        //   }) : [];
        //   return categories;
        // })
        // console.log(categoriesArray)
        // return categoriesArray.flat();
      // }
      // return [];
    },
    selectedViewableDate(state){
      return state.selectedDate;
    },
    todaysDate(state){
      return state.todaysDate
    },
    getTasksByDate: (state) => (date = state.selectedDate) => {
      return state.taskDatabase.find(list => {
        if(list.date === date){
          console.log(list)
          return list.taskList;
        }
      })
    }
  }
});
