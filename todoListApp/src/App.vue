<script setup>
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import Tasks from './components/Tasks.vue'
import TaskForm from './components/TaskForm.vue';
import Menu from './components/Menu.vue';


</script>

<template>
 
  
    <div class="">
      <nav class="mx-auto ">
        <RouterLink to="/" class="rounded-full" > Accueil</RouterLink>
      <RouterLink to="/ajouter-task" class="rounded-full">
         Ajouter une tâche
      </RouterLink >
      <RouterLink to="/connexion" class="rounded-full">
         Connexion
      </RouterLink >

      </nav>
      <RouterView />
  
 <!-- <Tasks :tasks="tasks"/> -->

  </div>
  
</template>

<style scoped>

</style>
