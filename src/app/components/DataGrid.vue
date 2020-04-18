<template>
  <div>
    <b-table
      striped
      hover
      :items="data"
      :small="true"
      :fields="fields"
      primary-key="id"
      selectable
      select-mode="single"
      @row-selected="onRowSelected"
    >
      <template v-slot:cell(actions)="data">
        <b-icon-trash @click="removeEmployee(data.item)"></b-icon-trash>
      </template>
    </b-table>
  </div>
</template>
<script>
import { BIconTrash } from "bootstrap-vue";

export default {
  name: "DataGrid",
  data: function() {
    return {
      data: this.$store.state.data,
      fields: [
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
        }
      ]
    };
  },
  components: {
    BIconTrash
  },
  methods: {
    onRowSelected(employees) {
      this.$store.commit("changeCurrentSelected", employees[0]);
    },
    removeEmployee(employee) {
      this.$store.commit("removeEmployee", employee);
    }
  }
};
</script>
<style  scoped>
</style>

