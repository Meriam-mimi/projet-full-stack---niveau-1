<script setup>

/*defineProps({
    description: String,
    name: String
})*/
import { ref } from 'vue';


defineProps({
    tasks: Array 
})

let tasks = ref([]);

fetch('http://localhost:3000/tasks')
  .then(response => response.json())
  .then(backendTasks => {
    tasks.value = backendTasks;
    console.log(backendTasks);
  })

</script>

<template>
  
  <div class="main mx-auto">
    <h1 class="titre">Liste des tâches</h1>
    <ul>
        <li v-for="task in tasks" :key="task._id">
        <h3>{{ task.name }}</h3>
        <p>{{ task.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
