import Vue from 'vue'
import Vuex from 'vuex'
import { Employee } from '../model/employee';
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
      },
      rehydrated :(store)=>{
         store.state.data = store.state.data.map(emp=>{
           let tmpEmp = new Employee(emp.id);
           Object.assign(tmpEmp,emp);
           return tmpEmp;
         })
      }
    })
  ],
  mutations: {
    addEmployee(state) {
      let maxId = Math.max.apply(
        Math,
          state.data.map(function(emp) {
          return emp.id;
        })
      );
      if (maxId == Number.NEGATIVE_INFINITY){
        maxId=0;
      }
      let emp = new Employee(maxId + 1);
      if (state.data.length>0){
        let latest = state.data[state.data.length-1];
        emp.uifRef = latest.uifRef;
        emp.tradingName = latest.tradingName;
        emp.shutFrom = latest.shutFrom;
        emp.shutTo = latest.shutTo
        emp.emailAddress = latest.emailAddress.substring(latest.emailAddress.indexOf("@"));
        emp.payeNumber = latest.payeNumber;
      }
      state.data.push(emp);      
      state.data.selected =emp;
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
      let index = state.data.findIndex((elm)=>{elm.id === employee.id});
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