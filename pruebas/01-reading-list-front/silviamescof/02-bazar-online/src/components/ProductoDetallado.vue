<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

interface Producto {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
const productoSeleccionado = ref<Producto | null>(null);
// Datos reactivos para el término de búsqueda
const terminoBusqueda = ref('');
const imagenAmpliada = ref<string | null>(null);
const mostrarImagenAmpliada = (imagen: string) => {
  imagenAmpliada.value = imagen;
};
const mostrarImagenPrincipal = () => {
  if (productoSeleccionado && productoSeleccionado.value && productoSeleccionado.value.images) {
    imagenAmpliada.value = productoSeleccionado.value.images[0];
  }
};
const cerrarImagenAmpliada = () => {
  imagenAmpliada.value = null;
};

// Accede al router
const router = useRouter();

// Función para generar emojis de estrellas basada en la valoración
const generarEstrellas = () => {
  if (productoSeleccionado && productoSeleccionado.value) {
    let estrellas = '⭐️'.repeat(Math.floor(productoSeleccionado.value.rating));
    const fraccion = productoSeleccionado.value.rating % 1;
    if (fraccion > 0.5) {
      estrellas += '⭐️';
    }
    return estrellas;
  }
  // En caso de que no haya un producto seleccionado, puedes devolver un valor predeterminado o manejarlo según tus necesidades.
  return '';
};


// Función para manejar la búsqueda y redirigir a la vista de productos
const buscar = () =>
{
  // Redirige a la vista de productos con el término de búsqueda como parámetro
  router.push({ name: 'productos', query: { q: terminoBusqueda.value } });
};
onMounted(() => {
  const storedProduct = localStorage.getItem('productoSeleccionado');
  console.log(storedProduct);
  if (storedProduct) {
    // Parsea la cadena almacenada en localStorage para convertirla de nuevo en un objeto.
    productoSeleccionado.value = JSON.parse(storedProduct);
  }
  console.log(productoSeleccionado.value);
});
</script>

<template>
  <div class="logopeque">    
        <img class="logopeque" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8eVhW_B-z8OxTwZfEDcyM6jS_95uRhz9V_A&usqp=CAU" alt="Logo de la empresa">
      </div>
       <!-- Agrega un evento de submit al formulario -->
     <form @submit.prevent="buscar" class="formSpan">
      <!-- Usa v-model para enlazar el valor del input a un dato en el componente -->
      <input v-model="terminoBusqueda" type="text" name="buscador" placeholder="laptops, smartphones, prices, ..." class="a">
      <input type="submit" value="BUSCAR" class="submit">
      
    </form>
  <div class="tarjetaProductoDetallado">
    <div class="galeria">
      <div class="imagenPrincipal">
        <img :src="productoSeleccionado?.images[0]" alt="Imagen del producto principal" @click="mostrarImagenPrincipal">
      </div>
      <div class="restoimagenes">
        <img v-for="(imagen, index) in productoSeleccionado?.images.slice(1)" :key="index" :src="imagen" alt="Imagen del producto" @click="mostrarImagenAmpliada(imagen)">
      </div>
    </div>

    <!-- Agregar un div para mostrar la imagen ampliada -->
    <div v-if="imagenAmpliada" class="imagenAmpliada" @click="cerrarImagenAmpliada">
      <img :src="imagenAmpliada" alt="Imagen ampliada">
    </div>
  

    <p class="titulo">{{ productoSeleccionado?.title }}</p>
    <p class="descuento">- {{ productoSeleccionado?.discountPercentage }} % Desc.</p>
    <p class="price">Precio: {{ productoSeleccionado?.price }} €</p>
    <p class="valoracion">Valoración: {{ generarEstrellas() }}</p>
    <p>Categoria: {{ productoSeleccionado?.category }}, Unidades: {{ productoSeleccionado?.stock }}, Marca: {{ productoSeleccionado?.brand }}</p>
    <p class="description">{{ productoSeleccionado?.description }}</p>
  </div>

  <button class="comprar">Comprar</button>
</template>


<style scoped>
/* Estilos específicos para la tarjeta del producto */
</style>
