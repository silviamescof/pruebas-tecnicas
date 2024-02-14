<script setup lang="ts">
    import { defineProps } from 'vue';
    import { useRoute } from 'vue-router';

    const props = defineProps(['producto']);
    const router = useRoute();
    // Función para generar emojis de estrellas basada en la valoración
    const generarEstrellas = () => {
      let estrellas = '⭐️'.repeat(Math.floor(props.producto.rating));
      const fraccion = props.producto.rating % 1;
      if (fraccion > 0.5) {
        estrellas += '⭐️';
      }
      return estrellas;
    };

    const detalleCompleto = () => {
    localStorage.setItem('productoSeleccionado', JSON.stringify(props.producto));
    };
</script>

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
