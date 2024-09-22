<template>
    <div class="login-container">
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Nom d'utilisateur :</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div>
          <label for="password">Mot de passe :</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
  
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: null
      };
    },
    methods: {
      async login() {
        try {
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password
            })
          });
  
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data.message || 'Erreur de connexion');
          }
  
          // Stocker le token JWT dans le localStorage
          localStorage.setItem('token', data.token);
          this.$router.push('/dashboard'); // Redirection vers une autre page après connexion
        } catch (error) {
          this.errorMessage = error.message;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 300px;
    margin: 0 auto;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  