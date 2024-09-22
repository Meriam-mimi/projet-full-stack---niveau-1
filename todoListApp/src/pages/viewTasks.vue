<script setup>
import Tasks from '../components/Tasks.vue'

let tasks = ref([]);

fetch('http://localhost:3000/tasks')
  .then(response => response.json())
  .then(backendTasks => {
    tasks.value = backendTasks;
    console.log(backendTasks);
  })

</script>


<template>
    <div>
        <Tasks :tasks="tasks"/>
    </div>
</template>

  
  <style scoped>
  h1 {
    margin-bottom: 20px;
  }
  </style>
  