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
      <div v-if="currentEmployee!='undefined' && currentEmployee!=null">
        <div
          class="strong my-4"
        >Currently Editing: {{currentEmployee.id}} {{currentEmployee.firstName}} {{currentEmployee.lastName}}</div>
        <b-form @submit="onSubmit">
          <div class="row">
            <div class="col-3">
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
                  :value="currentEmployee.shutdownFromHTML"
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
                  :value="currentEmployee.shutdownToHTML"
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
                  :state="validTradeName"
                  placeholder="trading name"
                  @input="update('tradingName',$event)"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validTradeName"
                >Trade name is required and has a max character length of 120</b-form-invalid-feedback>
              </b-form-group>
              <b-form-group
                id="input-group-5"
                label="Paye Number:"
                label-for="input-5"
                description="Paye Number"
              >
                <b-form-input
                  id="input-5"
                  :state="validPayeNumber"
                  :value="currentEmployee.payeNumber"
                  type="text"
                  placeholder="paye number"
                  @input="update('payeNumber',$event)"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validPayeNumber"
                >Paye number is optional and has a max character length of 20</b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-3">
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
                  :state="validContactNumber"
                  @input="update('contactNumber',$event)"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validContactNumber"
                >Contact number is required and has a max character length of 20</b-form-invalid-feedback>
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
                  :state="validEmailAddress"
                  placeholder="Test@email.com"
                  @input="update('emailAddress',$event)"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validEmailAddress"
                >Email address is required and has a max character length of 120</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-7a"
                label="ID Number:"
                label-for="input-7a"
                description="Employees ID Number"
              >
                <b-form-input
                  id="input-7a"
                  :value="currentEmployee.idNumber"
                  type="text"
                  placeholder="123456789"
                  :state="validIdNumber"
                  @input="update('idNumber',$event)"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validIdNumber"
                >Passport or id number is required and has a max character length of 30 no spaces</b-form-invalid-feedback>
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
                  :state="validFirstName"
                  @input="update('firstName',$event)"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validFirstName"
                >First name is required and has a max character length of 120</b-form-invalid-feedback>
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
                  :state="validLastName"
                  @input="update('lastName',$event)"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validLastName"
                >Last name is required and has a max character length of 120</b-form-invalid-feedback>
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
                  :state="validRenumeration"
                  @input="update('renumeration',$event)"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validRenumeration"
                >Renumerationis required and has a legnth of (10,2)</b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-3">
              <b-form-group
                id="input-group-11"
                label="Employment Start Date:"
                label-for="input-11"
                description="Will be converted to required format dd-MMM-yyyy"
              >
                <b-form-datepicker
                  id="input-11"
                  required
                  :value="currentEmployee.employmentStartHTML"
                  class="mb-2"
                  :state="validEmploymentStartDate"
                  @input="update('employmentStart',$event)"
                ></b-form-datepicker>
                <b-form-invalid-feedback
                  :state="validEmploymentStartDate"
                >Employment start date is required</b-form-invalid-feedback>
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
                  :value="currentEmployee.employmentEndHTML"
                  class="mb-2"
                  :state="validEmploymentEndDate"
                  @input="update('employmentEnd',$event)"
                ></b-form-datepicker>
                <b-form-invalid-feedback
                  :state="validEmploymentEndDate"
                >Employment end date is required</b-form-invalid-feedback>
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
                  :state="validMinWage"
                  @input="update('minWage',$event)"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validMinWage"
                >Min wage is required and has a legnth of (10,2)</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-14"
                label="Remumeration Recevied During Shutdown Period:"
                label-for="input-14"
                description="Remumeration Recevied During Shutdown Period"
              >
                <b-form-input
                  id="input-14"
                  :value="currentEmployee.renumerationReceived"
                  type="number"
                  placeholder="3500"
                  :state="validRenumerationReceived"
                  @input="update('renumerationReceived',$event)"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validRenumerationReceived"
                >Renumeration received is required and has a legnth of (10,2)</b-form-invalid-feedback>
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
                  :state="validBankName"
                  @input="update('bankName',$event)"
                ></b-form-select>
                <b-form-invalid-feedback
                  :state="validBankName"
                >Bank name is required and has a max character length of 120</b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-3">
              <b-form-group
                id="input-group-16"
                label="Branch Code:"
                label-for="input-16"
                description="Branch Code"
              >
                <b-form-input
                  id="input-16"
                  :value="currentEmployee.branchCode"
                  type="text"
                  :state="validBranchCode"
                  placeholder="0250665"
                  @input="update('branchCode',$event)"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validBranchCode"
                >Branch code is required and has a max character length of 10</b-form-invalid-feedback>
              </b-form-group>

              <b-form-select @change="updateBranchCode" :options="branchCodes"></b-form-select>

              <b-form-group
                id="input-group-17"
                label="Account Type:"
                label-for="input-17"
                description="Account Type"
              >
                <b-form-select
                  id="input-17"
                  :value="currentEmployee.accountType"
                  :options="accountTypes"
                  placeholder="1"
                  :state="validAccountType"
                  @input="update('accountType',$event)"
                ></b-form-select>
                <b-form-invalid-feedback
                  :state="validAccountType"
                >Account type is required and valid values are 1,2 or 3</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-18"
                label="Account Number:"
                label-for="input-18"
                description="Bank Account Number"
              >
                <b-form-input
                  id="input-18"
                  :value="currentEmployee.accountNumber"
                  type="text"
                  placeholder="1"
                  :state="validAccountNumber"
                  @input="update('accountNumber',$event)"
                ></b-form-input>
                <b-form-invalid-feedback
                  :state="validAccountNumber"
                >Account number is required and a max character length of 20</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group
                id="input-group-19"
                label="Payment Medium:"
                label-for="input-19"
                description="Payment Medium"
              >
                <b-form-select
                  id="input-19"
                  :value="currentEmployee.paymentMedium"
                  :options=paymentMediums
                  placeholder="1"
                  :state="validPaymentMedium"
                  @input="update('paymentMedium',$event)"
                ></b-form-select>
                <b-form-invalid-feedback
                  :state="validPaymentMedium"
                >Payment medium is is required and and valid values are 1,2 or 3</b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
        </b-form>
      </div>
    </b-container>
  </div>
</template>
<script>
import { ValidateEmployeeUtil } from "../model/employee";
import { BIconPlusCircle } from "bootstrap-vue";

export default {
  name: "AddEditEmployee",
  props: {},
  data: function() {
    return {
      accountTypes: [
        { value: "1", text: "Current" },
        { value: "2", text: "Saving" },
        { value: "3", text: "Transmission" }
      ],
      paymentMediums: [
        { value: "1", text: "Pay to employee" },
        { value: "2", text: "Pay to employer" },
        { value: "3", text: "Pay to bargaining council" }
      ],
      branchCodes: [
        { value: "632005", text: "Absa Group Limited (632005)" },
        { value: "410506", text: "Bank of Athens (410506)" },
        { value: "462005", text: "Bidvest Bank Limited (462005)" },
        { value: "470010", text: "Capitec Bank Limited (470010)" },
        { value: "254005", text: "First National Bank (254005)" },
        { value: "580105", text: "Investec Bank Limited (580105)" },
        { value: "198765", text: "Nedbank Limited (198765)" },
        { value: "051001", text: "Standard Bank of South Africa (051001)" },
        { value: "460005", text: "SA Post Bank (460005)" }
      ],
      banks: [
        { value: "Absa Group Limited", text: "Absa Group Limited" },
        { value: "African Bank Limited", text: "African Bank Limited" },
        { value: "Bank of Athens/GroBank", text: "Bank of Athens/GroBank" },
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
        { value: "SA Post Bank ", text: "SA Post Bank" },
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
    validTradeName() {
      return ValidateEmployeeUtil.validTradeName(this.currentEmployee);
    },
    validUifRef() {
      return ValidateEmployeeUtil.validUifRef(this.currentEmployee);
    },
    validShutFromDate() {
      return ValidateEmployeeUtil.validShutFromDate(this.currentEmployee);
    },
    validShutToDate() {
      return ValidateEmployeeUtil.validShutToDate(this.currentEmployee);
    },
    validPayeNumber() {
      return ValidateEmployeeUtil.validPayeNumber(this.currentEmployee);
    },
    validContactNumber() {
      return ValidateEmployeeUtil.validContactNumber(this.currentEmployee);
    },
    validEmailAddress() {
      return ValidateEmployeeUtil.validEmailAddress(this.currentEmployee);
    },
    validIdNumber() {
      return ValidateEmployeeUtil.validIdNumber(this.currentEmployee);
    },
    validFirstName() {
      return ValidateEmployeeUtil.validFirstName(this.currentEmployee);
    },
    validLastName() {
      return ValidateEmployeeUtil.validLastName(this.currentEmployee);
    },
    validRenumeration() {
      return ValidateEmployeeUtil.validRenumeration(this.currentEmployee);
    },
    validRenumerationReceived() {
      return ValidateEmployeeUtil.validRenumerationReceived(
        this.currentEmployee
      );
    },
    validMinWage() {
      return ValidateEmployeeUtil.validMinWage(this.currentEmployee);
    },
    validEmploymentStartDate() {
      return ValidateEmployeeUtil.validEmploymentStartDate(
        this.currentEmployee
      );
    },
    validEmploymentEndDate() {
      return ValidateEmployeeUtil.validEmploymentEndDate(this.currentEmployee);
    },
    validBankName() {
      return ValidateEmployeeUtil.validBankName(this.currentEmployee);
    },
    validBranchCode() {
      return ValidateEmployeeUtil.validBranchCode(this.currentEmployee);
    },
    validAccountNumber() {
      return ValidateEmployeeUtil.validBranchCode(this.currentEmployee);
    },
    validAccountType() {
      return ValidateEmployeeUtil.validAccountType(this.currentEmployee);
    },
    validPaymentMedium() {
      return ValidateEmployeeUtil.validPaymentMedium(this.currentEmployee);
    }
  },
  components: {
    BIconPlusCircle
  },
  methods: {
    updateBranchCode(value) {
      this.currentEmployee.branchCode = value;
    },
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
      this.$store.commit("addEmployee");
    }
  }
};
</script>
<style  scoped>
</style>

