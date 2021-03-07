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
    dailyTasks: []
  },
  mutations: {
    LOAD_USER_TASKS(state, payload){
      state.taskDatabase = payload;
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
      state.taskDatabase = state.taskDatabase.map( task => {
        let arrayForDate = task;
        if(task.date === payload.date){
          let savedInfo = task.taskList.filter(specificTask => specificTask.id !== payload.id)
          arrayForDate = {...task, taskList: savedInfo};
        }
        return  arrayForDate;
      });
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

      const newID = Math.max(getters.IDarray) + 1;
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
      commit('REMOVE_TASK', payload);
    },
    loadUserTasks({commit}){
      const loadedTasks = testTimeData;
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
      let dailiesArray = state.taskDatabase.map(e => {
        let dailies = e.taskList.filter( task => {
          return task.repeat === "Daily"
        })
        return dailies;
      })
      return dailiesArray.flat()
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
          return list.taskList;
        }
      })
    }
  }
});
