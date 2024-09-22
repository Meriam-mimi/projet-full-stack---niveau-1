// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'; 
import Tasks from '../components/Tasks.vue';
import Login from '../components/Login.vue';
import TaskForm from '../components/TaskForm.vue';
import dashboard from '../pages/dashboard.vue'

const routes = [
  {
    path: '/',
    component: Tasks,
  },
  {
    path: '/ajouter-task',
    component: TaskForm,
  },
  {
    path: '/add',
    component: Tasks,
  },
  {
    path: '/connexion',
    component: Login,
  },
  {
    path: '/dashboard',
    component: dashboard,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


import { nextTick } from 'vue'
import HelloWorld from '../components/HelloWorld.vue';
import ViewTasks from '../pages/viewTasks.vue';

nextTick(() => {
  router.push('/ajouter-task')
})
export default router;
