import Vue from "vue";
import Vuex from "vuex";
import testData from "../../tests/testData.json"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    taskItems: [],
  },
  mutations: {
    LOAD_USER_TASKS(state, payload){
      state.taskItems = payload;
    },
    ADD_TASK(state, payload){
      state.taskItems.push(payload);
    },
    REMOVE_TASK(state, payload){
      state.taskItems = state.taskItems.filter( task => task.id !== payload)
    }
  },
  actions: {
    addTask({commit, state}, payload){
      console.log(state.taskItems.length)
      console.log(state.taskItems[0])
        console.log(state.taskItems[state.taskItems.length])
      const newID = state.taskItems[state.taskItems.length - 1].id++;
      commit('ADD_TASK', {...payload, id: newID, completed: false});
    },
    removeTask({commit}, payload){
      commit('REMOVE_TASK', payload);
    },
    loadUserTasks({commit}){
      const loadedTasks = testData;
      commit('LOAD_USER_TASKS', loadedTasks);
    }
  },
  getters: {
    allTaskItems(state){
      return state.taskItems;
    },
    dailies(state) {
      return state.taskItems.filter((task) => {
        return task.repeat === "daily";
      });
    },
    todayTasks(state) {
      return state.taskItems.filter((task) => {
        return task.repeat === null;
      });
    },
  }
});
