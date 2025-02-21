<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <router-view />
  <div>

    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/product_skf.jpg" class="logo vue" alt="SKF" />
    </a>
  </div>
  
  <HelloWorld msg="Molnár Szerszám" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
