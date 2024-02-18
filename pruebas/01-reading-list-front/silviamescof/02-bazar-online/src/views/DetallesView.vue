<!--Esta vista contiene dos componentes: carro y el detalle de producto y comunica la interaccion entre ambos
-->
 <!--////////////////////////////////////////TEMPLATE////////////////////////////////////////-->  
<template>
  <div class="vistaDetalles">
     <!-- Componente Carro -->
     <Carro @productoAgregado="handleProductoAgregado"/>
    <!-- Contenido de tu componente actual -->
    <ProductoDetallado @productoAgregado="handleProductoAgregado" />
  </div>
</template>
 <!--////////////////////////////////////////SCRIPT///////////////////////////////////////-->  
<script setup lang="ts">
import ProductoDetallado from '@/components/ProductoDetallado.vue';
import Carro from '@/components/Carro.vue';
/*
******************************************************************************************
@method funcion que recarga la pagina, cada vez que se ha añadido un producto al carrito
o el carrito se ha vaciado, para que se reflejen los cambios
******************************************************************************************
*/
const handleProductoAgregado = () => {
  // Obtener la parte de la ruta y el query string de la URL actual
  const path = window.location.pathname;
  const queryString = window.location.search;

  // Reconstruir la URL y recargar la página
  window.location.href = path + queryString;
};
</script>
 <!--///////////////////////////////////////STYLE///////////////////////////////////////-->  
<style scoped>
/* Estilos específicos para la vista que contiene ambos componentes */
</style>
