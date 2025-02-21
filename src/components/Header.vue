<template>
    <nav class="navbar">
      <router-link to="/">Főoldal</router-link>
      <router-link to="/products">Termékek</router-link>
      <router-link to="/auth" class="auth-link">Bejelentkezés / Regisztráció</router-link>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    background: #333;
    padding: 1rem;
  }
  
  .navbar a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
  }
  
  .auth-link {
    margin-left: auto;
  }
  </style>
  