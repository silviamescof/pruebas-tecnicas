 <!--////////////////////////////////////////SCRIPT///////////////////////////////////////-->  
<script setup lang="ts">
  import { defineProps } from 'vue';
  import { useRoute } from 'vue-router';

  const props = defineProps(['producto']);
  const router = useRoute();
/*
******************************************************************************************
@method funcion que crea un string con tantas estrellas como puntos haya en la valoracion
******************************************************************************************
*/
  const generarEstrellas = () => {
    let estrellas = '⭐️'.repeat(Math.floor(props.producto.rating));
    const fraccion = props.producto.rating % 1;
    if (fraccion > 0.5) {
      estrellas += '⭐️';
    }
    return estrellas;
  };
/*
******************************************************************************************
@method funcion que almacena en LocaleStorage el producto para que pueda ser recuperado
en la vista ProductoDetallado, por el componente ProductoDetallado
******************************************************************************************
*/
  const detalleCompleto = () => {
    localStorage.setItem('productoSeleccionado', JSON.stringify(props.producto));
  };
</script>
<!--////////////////////////////////////////TEMPLATE////////////////////////////////////////-->  
<template>
  <router-link :to="{ name: 'detalles' }">
    <div class="tarjetaProducto" @click="detalleCompleto">
      <img :src="props.producto.thumbnail" alt="Imagen del producto">
      <p>{{ props.producto.description }}</p>
      <p class="precio">{{ props.producto.price }} €</p>
      <p>Valoración: {{ generarEstrellas() }}</p>
    </div>
  </router-link>
</template>

<style scoped>
/* Estilos específicos para la tarjeta del producto */
</style>
