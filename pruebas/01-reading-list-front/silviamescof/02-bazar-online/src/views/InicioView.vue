<!--Esta vista es el punnto de entrada de la aplicación, permite hacer una busqueda
   y dirige a la vista productosView con el dato recogido en el input-->

 <!--////////////////////////////////////////TEMPLATE////////////////////////////////////////-->  
<template>
  <article class="inicio">
    <h1>Bazar Online</h1>
    <img class="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8eVhW_B-z8OxTwZfEDcyM6jS_95uRhz9V_A&usqp=CAU" alt="Logo de la empresa">
    <!-- Agrega un evento de submit al formulario -->
    <form @submit.prevent="buscar" >
      <!-- Usa v-model para enlazar el valor del input a un dato en el componente -->
      <input v-model="terminoBusqueda" type="text" name="buscador" placeholder="laptops, smartphones, prices, ..." class="inputpque">
      <input type="submit" value="BUSCAR" class="submit">
    </form>
    
  </article>
</template>
 <!--////////////////////////////////////////SCRIPT///////////////////////////////////////-->  
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Datos reactivos para el término de búsqueda
const terminoBusqueda = ref('');
// Accede al router
const router = useRouter();
// Función para manejar la búsqueda y redirigir a la vista de productos
const buscar = () =>
{
  // Redirige a la vista de productos con el término de búsqueda como parámetro
  router.push({ name: 'productos', query: { q: terminoBusqueda.value } });
};
</script>
 <!--///////////////////////////////////////STYLE///////////////////////////////////////-->  
<style scoped>
</style>
