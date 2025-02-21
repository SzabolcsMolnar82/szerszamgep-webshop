<template>
    <div>
      <h1>Új termék hozzáadása</h1>
      <form @submit.prevent="addProduct">
        <div>
          <label for="termek_neve">Termék neve:</label>
          <input type="text" v-model="termek_neve" required />
        </div>
        <div>
          <label for="gyarto">Gyártó:</label>
          <input type="text" v-model="gyarto" required />
        </div>
        <div>
          <label for="leiras">Leírás:</label>
          <textarea v-model="leiras" required></textarea>
        </div>
        <button type="submit">Hozzáadás</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from "vue";
  
  const termek_neve = ref("");
  const gyarto = ref("");
  const leiras = ref("");
  const message = ref("");
  
  const emit = defineEmits(["product-added"]);
  
  const addProduct = async () => {
    const response = await fetch("http://localhost:5000/api/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        termek_neve: termek_neve.value,
        gyarto: gyarto.value,
        leiras: leiras.value,
      }),
    });
  
    const data = await response.json();
    message.value = data.message || data.error;
  
    // Ha sikeres volt a hozzáadás, értesítjük a Products oldalt
    if (response.ok) {
      emit("product-added");
    }
  
    // Űrlap kiürítése
    termek_neve.value = "";
    gyarto.value = "";
    leiras.value = "";
  };
  </script>
  