<template>
  <div class="overflow-auto">
    <div class="d-inline-flex align-items-center">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="employee-table"
      ></b-pagination>
      <div class="ml-2 badge badge-primary" style="width:320px;">Total: {{rows}}</div>
      <b-form-select :options="pagePerRowPresets" v-model="perPage" class="ml-2"></b-form-select>
      <b-form-select :options="pagePerRowPresets" v-model="perPage" class="ml-2"></b-form-select>
      <b-form-input
        class="ml-2"
        type="text"
        v-model="filterString"
        placeholder="Enter your search criteria"
      ></b-form-input>
      <b-icon-search class="ml-2 mt-1"></b-icon-search>
      <div>
        <div v-if="isDataValid" style="width:300px;">
          <a @click="downloadCSV" href="#">
            | Export to CSV
            <b-icon-search class="ml-2 mt-2"></b-icon-search>
          </a>
        </div>
        <div v-else style="width:300px;">
          <a @click="downloadCSV" class="mx-2" href="javascript: void(0)" style="color:red;">
            | Export to CSV
            <b-icon-search class="mx-2 mt-2"></b-icon-search>
          </a>
        </div>
      </div>
    </div>
    <b-table
      id="employee-table"
      striped
      hover
      :items="data"
      :filter="filterString"
      :per-page="perPage"
      :current-page="currentPage"
      :small="true"
      :fields="fields"
      primary-key="id"
      selectable
      select-mode="single"
      @row-selected="onRowSelected"
    >
      <template v-slot:cell(selected)="{rowSelected}">
        <span v-if="rowSelected" aria-label="selected">
          <b aria-hidden="true">√</b>
        </span>
      </template>
      <template v-slot:cell(actions)="data">
        <b-icon-trash @click="removeEmployee(data.item)"></b-icon-trash>
      </template>
    </b-table>
  </div>
</template>
<script>
import { BIconTrash, BIconSearch } from "bootstrap-vue";
import { ValidateEmployeeUtil } from "../model/employee";

export default {
  name: "DataGrid",
  data: function() {
    return {
      perPage: 10,
      filterString: null,
      pagePerRowPresets: [5, 10, 15, 25, 50],
      currentPage: 1,
      data: this.$store.state.data,
      fields: [
        { key: "selected", label: "√" },
        { key: "actions", label: "Actions" },
        {
          key: "id",
          label: "idx",
          sortable: true
        },
        {
          key: "uifRef",
          label: "UifReferenceNumber*",
          sortable: true
        },
        {
          key: "shutdownFrom",
          label: "Shutdown From*",
          sortByFormatted: "true",
          filterByFormatted: "true"
        },
        {
          key: "shutdownTo",
          label: "Shutdown Till*"
        },
        {
          key: "tradingName",
          label: "TradeName*"
        },
        {
          key: "payeNumber",
          label: "Paye Number"
        },
        {
          key: "contactNumber",
          label: "Contact Number*"
        },
        {
          key: "emailAddress",
          label: "Email Address*"
        },
        {
          key: "idNumber",
          label: "IDNumber*"
        },
        {
          key: "firstName",
          label: "FirstName*"
        },
        {
          key: "lastName",
          label: "LastName (Surname)*"
        },
        {
          key: "renumeration",
          label: "Renumeration (monthly)*"
        },
        {
          key: "employmentStart",
          label: "Emplpoyment Start Date (DD-MMM-YYYY)Only*"
        },
        {
          key: "employmentEnd",
          label: "Emplpoyment Start Date (DD-MMM-YYYY)Only*"
        },
        {
          key: "minWage",
          label: "Sector Minimum wage per month*"
        },
        {
          key: "renumerationReceived",
          label: "Renumeration Received During Shutdown Period*"
        },
        {
          key: "bankName",
          label: "Bank Name*"
        },
        {
          key: "banchCode",
          label: "Branch Code*"
        },
        {
          key: "accountType",
          label: "Account Type*"
        },
        {
          key: "accountNumber",
          label: "Account Number*"
        },
        {
          key: "paymentMedium",
          label: "Payment Medium*"
        }
      ]
    };
  },
  computed: {
    rows() {
      return this.$store.state.data.length;
    },
    isDataValid() {
      return this.$store.state.data.find(emp => {
        return ValidateEmployeeUtil.validateEmployee(emp);
      });
    }
  },
  components: {
    BIconTrash,
    BIconSearch
  },
  methods: {
    onRowSelected(employees) {
      this.$store.commit("changeCurrentSelected", employees[0]);
    },
    removeEmployee(employee) {
      this.$store.commit("removeEmployee", employee);
    },
    downloadCSV() {
      let filename = this.$store.state.data[0].uifRef.replace(/\//g,"");
      let today = new Date(Date.now());
      let todayStr = this.$store.state.data[0]
        .convertDateToString(today, true)
        .replace(/-/g,"");
      filename += "_"+ todayStr;
      filename += "_" + today.getHours();
      filename += today.getMinutes() + ".txt";

      let csvContent = "data:text/csv;charset=utf-8,";

      csvContent += [
        "H|" + todayStr,
        ...this.$store.state.data.map(item => item.asCSV()),
        "F|" + this.$store.state.data.length
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", filename);
      link.click();
    }
  }
};
</script>
<style  scoped>
</style>

