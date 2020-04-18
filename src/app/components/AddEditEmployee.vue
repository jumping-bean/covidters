<template>
  <div class="border-top my-3 pt-3">
    <b-container>
      <h3 style="display:inline" class="mr-4">Employee Edit Form</h3>
      <a href="#" @click="addEmployee">
        <b-icon-plus-circle></b-icon-plus-circle>
        <span class="ml-2">Add Employee</span>
      </a>
      <a href="#" @click="clearAll">
        <b-icon-trash class="ml-2"></b-icon-trash>
        <span class="ml-2">Delete All (Clear all data in table)</span>
      </a>
      <div v-if="currentEmployee!='undefined'">
        <div
          class="strong my-4"
        >Currently Editing: {{currentEmployee.id}} {{currentEmployee.firstName}} {{currentEmployee.lastName}}</div>
        <b-form @submit="onSubmit">
          <div class="row">
            <div class="col-4">
              <b-form-group
                id="input-group-1"
                label="UifReference:"
                label-for="input-1"
                description="Uif Reference Number (format 0000000/3)"
              >
                <b-form-input
                  id="input-1"
                  :value="currentEmployee.uifRef"
                  type="text"
                  placeholder="0000000/3"
                  @input="update('uifRef',$event)"
                  :state="validUifRef"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validUifRef"
                >Length: 9 (fixed length, must contain ‘/’ character)</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Shutdown From:"
                label-for="input-2"
                description="Will be converted to required format dd-MMM-yyyy"
              >
                <b-form-datepicker
                  id="input-2"
                  :state="validShutFromDate"
                  :value="currentEmployee.shutdownFrom"
                  class="mb-2"
                  @input="update('shutdownFrom',$event)"
                ></b-form-datepicker>
                <b-form-invalid-feedback
                  :state="validShutFromDate"
                >Shutdown from date is required. Try 27 April 2020.</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Shutdown Till:"
                label-for="input-3"
                description="Will be converted to required format dd-MMM-yyyy"
              >
                <b-form-datepicker
                  id="input-3"
                  required
                  :value="currentEmployee.shutdownTo"
                  :state="validShutToDate"
                  class="mb-2"
                  @input="update('shutdownTo',$event)"
                ></b-form-datepicker>
                <b-form-invalid-feedback
                  :state="validShutToDate"
                >Shutdown from date is required. Try 30 April 2020.</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-4"
                label="Trade Name:"
                label-for="input-4"
                description="Trade Name"
              >
                <b-form-input
                  id="input-4"
                  :value="currentEmployee.tradingName"
                  type="text"
                  :state="required"
                  placeholder="trading name"
                  @input="update('tradingName',$event)"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-5"
                label="Paye Number:"
                label-for="input-5"
                description="Paye Number"
              >
                <b-form-input
                  id="input-5"
                  :value="currentEmployee.payeNumber"
                  type="text"
                  placeholder="paye number"
                  @input="update('payeNumber',$event)"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-4">
              <b-form-group
                id="input-group-6"
                label="Contact Number:"
                label-for="input-6"
                description="Contact Number"
              >
                <b-form-input
                  id="input-6"
                  :value="currentEmployee.contactNumber"
                  type="text"
                  placeholder="0123456789"
                  @input="update('contactNumber',$event)"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-7"
                label="Email Address:"
                label-for="input-7"
                description="Employees email address"
              >
                <b-form-input
                  id="input-7"
                  :value="currentEmployee.emailAddress"
                  type="email"
                  placeholder="Test@email.com"
                  @input="update('emailAddress',$event)"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-8"
                label="First Name:"
                label-for="input-8"
                description="First Name"
              >
                <b-form-input
                  id="input-8"
                  :value="currentEmployee.firstName"
                  type="text"
                  placeholder="Joe"
                  @input="update('firstName',$event)"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-9"
                label="Last Name:"
                label-for="input-9"
                description="Last Name (Surname)"
              >
                <b-form-input
                  id="input-9"
                  :value="currentEmployee.lastName"
                  type="text"
                  placeholder="Soap"
                  @input="update('lastName',$event)"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-10"
                label="Remumeration (Monthly):"
                label-for="input-10"
                description="Remumeration (Monthly)"
              >
                <b-form-input
                  id="input-10"
                  :value="currentEmployee.renumeration"
                  type="number"
                  placeholder="4000"
                  @input="update('renumeration',$event)"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-4">
              <b-form-group
                id="input-group-11"
                label="Employment Start Date:"
                label-for="input-11"
                description="Will be converted to required format dd-MMM-yyyy"
              >
                <b-form-datepicker
                  id="input-11"
                  required
                  :value="currentEmployee.empStart"
                  class="mb-2"
                  @input="update('employmentStart',$event)"
                ></b-form-datepicker>
              </b-form-group>

              <b-form-group
                id="input-group-12"
                label="Employment End Date:"
                label-for="input-12"
                description="Last day employee was paid. Will be converted to required format dd-MMM-yyyy"
              >
                <b-form-datepicker
                  id="input-12"
                  required
                  :value="currentEmployee.empEnd"
                  class="mb-2"
                  @input="update('employmentEnd',$event)"
                ></b-form-datepicker>
              </b-form-group>

              <b-form-group
                id="input-group-13"
                label="Sector Minimum wage per month:"
                label-for="input-13"
                description="Sector minimum wage per month"
              >
                <b-form-input
                  id="input-13"
                  :value="currentEmployee.minWage"
                  type="number"
                  placeholder="4000"
                  @input="update('minWage',$event)"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-14"
                label="Remumeration Recevied During Shutdown Period:"
                label-for="input-14"
                description="Remumeration Recevied During Shutdown Period"
              >
                <b-form-input
                  id="input-14"
                  :value="currentEmployee.minWage"
                  type="number"
                  placeholder="3500"
                  @input="update('minWage',$event)"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-15"
                label="Bank Name:"
                label-for="input-15"
                description="Bank name"
              >
                <b-form-select
                  :options="banks"
                  id="input-15"
                  required
                  :value="currentEmployee.bankName"
                  class="mb-2"
                  @input="update('bankName',$event)"
                ></b-form-select>
              </b-form-group>
            </div>
          </div>
        </b-form>
      </div>
    </b-container>
  </div>
</template>
<script>
import Employee from "../model/employee";
import { BIconPlusCircle } from "bootstrap-vue";

export default {
  name: "AddEditEmployee",
  props: {},
  data: function() {
    return {
      banks: [
        { value: "Absa Group Limited", text: "Absa Group Limited" },
        { value: "African Bank Limited", text: "African Bank Limited" },
        { value: "Bidvest Bank Limited", text: "Bidvest Bank Limited" },
        { value: "Capitec Bank Limited", text: "Capitec Bank Limited" },
        { value: "Discovery Limited", text: "Discovery Limited" },
        { value: "First National Bank", text: "First National Bank" },
        { value: "FirstRand Bank", text: "FirstRand Bank" },
        { value: "Grindrod Bank Limited", text: "Grindrod Bank Limited" },
        {
          value: "Imperial Bank South Africa",
          text: "Imperial Bank South Africa"
        },
        { value: "Investec Bank Limited", text: "Investec Bank Limited" },
        { value: "Nedbank Limited", text: "Nedbank Limited" },
        { value: "Sasfin Bank Limited", text: "Sasfin Bank Limited" },
        {
          value: "Standard Bank of South Africa",
          text: "Standard Bank of South Africa"
        },
        { value: "Ubank Limited", text: "Ubank Limited" },
        { value: "TymeBank", text: "TymeBank" }
      ]
    };
  },
  computed: {
    currentEmployee() {
      return this.$store.state.selected;
    },
    validUifRef() {
      let re = /^\d{7}\/\d{1}$/;
      return re.test(this.currentEmployee.uifRef);
    },
    validShutFromDate() {
      let tmpDate = new Date(this.currentEmployee.shutdownFrom);
      return tmpDate instanceof Date && !isNaN(tmpDate);
    },
    validShutToDate() {
      let tmpDate = new Date(this.currentEmployee.shutdownTo);
      return tmpDate instanceof Date && !isNaN(tmpDate);
    },
    required(value){
        console.log(value);
        return true;
    }   
  },
  components: {
    BIconPlusCircle
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.currentEmployee));
    },
    update(key, value) {
      this.$store.commit("updateEmployee", {
        employee: this.currentEmployee,
        key: key,
        value: value
      });
    },
    clearAll() {
      this.$store.commit("clearAll");
    },
    addEmployee() {
      let maxId = Math.max.apply(
        Math,
        this.$store.state.data.map(function(emp) {
          return emp.id;
        })
      );

      let emp = new Employee(maxId + 1);
      this.$store.commit("addEmployee", emp);
      this.$store.commit("changeCurrentSelected", emp);
    }
  }
};
</script>
<style  scoped>
</style>

