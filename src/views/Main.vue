<template>
  <div id="main">
        <DataGrid></DataGrid>
        <AddEditEmployee />
  </div>
</template>

<script>
// @ is an alias to /src
import DataGrid from '@/components/DataGrid.vue'
import AddEditEmployee from '@/components/AddEditEmployee.vue'

export default {
  name: 'Main',
  components: {
    DataGrid,
    AddEditEmployee
  }
}
</script>
<style scoped>
#main{
    text-align: left;
}
</style>