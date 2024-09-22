<script setup>
import { ref } from 'vue';


let name = ref(''); 
let description = ref('');
let tasks = ref([]);


const addTask = async () => {
  if (name.value.trim() && description.value.trim()) {
    const newTaskObj = {
      name: name.value,
      description: description.value,
    };


    try {
      const response = await fetch('http://localhost:3000/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaskObj),
      });
      //
      const addedTask = await response.json();
      tasks.value.push(addedTask); 
      name.value = ''; 
      description.value = '';
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
    }
  }
};
</script>

<template>
  <div class="main">
    <h2>Ajouter une nouvelle tâche</h2>
    <form @submit.prevent="addTask">
      <input v-model="name" placeholder="Nom de la tâche" />
      <input v-model="description" placeholder="Description de la tâche" />
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<style scoped>
/* Style simple pour le formulaire */
input {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  border: 1px solid grey;
  border-radius: 10px;
}
button {
  padding: 8px 16px;
}
</style>
