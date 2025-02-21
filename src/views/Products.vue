<template>
  <div>
    <h1>Termékek</h1>
    <AddProduct @product-added="fetchProducts" />
    
    <h2>Elérhető termékek</h2>
    <ul v-if="products.length > 0">
      <li v-for="product in products" :key="product.id">
        <strong>{{ product.termek_neve }}</strong> - {{ product.gyarto }}
        <p>{{ product.leiras }}</p>
      </li>
    </ul>
    <p v-else>Még nincsenek termékek.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AddProduct from "../components/AddProduct.vue";

const products = ref([]);

// Termékek lekérése az adatbázisból
const fetchProducts = async () => {
  const response = await fetch("http://localhost:5000/api/products");
  const data = await response.json();
  products.value = data;
};

// Betöltéskor frissítse a termékeket
onMounted(fetchProducts);
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
