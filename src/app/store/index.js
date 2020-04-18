import Vue from 'vue'
import Vuex from 'vuex'
import Employee from '../model/employee';
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

var password = sessionStorage.getItem("password");
var ls = new SecureLS({encodingType: 'aes',encryptionSecret: password, isCompression: false});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: new Employee(1,'000000/3',new Date('2020-04-01'),new Date('2020-04-30'),'Demo'),
    data: [
      new Employee(1,'000000/3',new Date('2020-04-01'),new Date('2020-04-30'),'Demo'),
      new Employee(2,'000000/3',new Date('2020-04-01'),new Date('2020-04-30'),'Demo2')
    ]
  },  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
  mutations: {
    addEmployee(state, employee) {
      state.data.push(employee);
    },
    changeCurrentSelected(state, employee) {
      if (employee) {
        state.selected = employee;
      } else {
        state.selected = null;
      }
    },
    updateEmployee(state,data){
      let current = state.data.find(elm =>{ return elm.id === data.employee.id});
      if (current){
        Vue.set(current, data.key, data.value)
        //current[data.key]=data.value;
      }else {
        state.data.push(data.employee);
      }
    },
    removeEmployee(state,employee){
      console.log(employee.id);
      let index = state.data.findIndex(elm =>{ console.log(elm.id); return elm.id === employee.id});
      if (index!=-1){
        state.data.splice(index,1);
      }
    },
    clearAll(state){
      state.data.splice(0,state.data.length);
      state.data.push(new Employee(1));
    }
  },
  actions: {
  },
  modules: {
  }
})