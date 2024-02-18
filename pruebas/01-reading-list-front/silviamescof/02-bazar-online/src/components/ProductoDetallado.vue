 <!--////////////////////////////////////////SCRIPT///////////////////////////////////////-->  
<script setup lang="ts">

import { onMounted, ref, defineEmits } from 'vue';
import type { Producto } from '@/services/interfaces';
import { useRouter } from 'vue-router';

const productoSeleccionado = ref<Producto | null>(null);//producto que se esta detallando 
const terminoBusqueda = ref(''); //valor del input del formulario
const imagenAmpliada = ref<string | null>(null);//variable para aumentar la imagen que se pulsa
const emit = defineEmits(['productoAgregado']);// definicion de la emision de eventos cuando se añade un producto a la cesta
const router = useRouter();//accede a router
/*
******************************************************************************************
@method funcion que sasigna un valor a imagen prinicpal para que pueda ser agrandada 
******************************************************************************************
*/
const mostrarImagenAmpliada = (imagen: string) => {
  imagenAmpliada.value = imagen;
};
/*
******************************************************************************************
@method funcion que agranda la imagen principal
******************************************************************************************
*/
const mostrarImagenPrincipal = () => {
  if (productoSeleccionado && productoSeleccionado.value && productoSeleccionado.value.images) {
    imagenAmpliada.value = productoSeleccionado.value.images[0];
  }
};
/*
******************************************************************************************
@method funcion que elimina el valor de imagen prinicipal para que se cierre
******************************************************************************************
*/
const cerrarImagenAmpliada = () => {
  imagenAmpliada.value = null;
};
/*
******************************************************************************************
@method funcion que crea un string con tantas estrellas como puntos haya en la valoracion
******************************************************************************************
*/
const generarEstrellas = () => {
  if (productoSeleccionado && productoSeleccionado.value) {
    let estrellas = '⭐️'.repeat(Math.floor(productoSeleccionado.value.rating));
    const fraccion = productoSeleccionado.value.rating % 1;
    if (fraccion > 0.5) {
      estrellas += '⭐️';
    }
    return estrellas;
  }
};
/*
******************************************************************************************
@method funcion que redirige a la vista productos con un criterio de busqueda para que
pueda mostrarse
******************************************************************************************
*/
const buscar = () =>
{
  router.push({ name: 'productos', query: { q: terminoBusqueda.value } });
};
/*
******************************************************************************************
@method funcion que recupera el valor del producto que hay que detallar de localeStorage
******************************************************************************************
*/
onMounted(() => {
  const storedProduct = localStorage.getItem('productoSeleccionado');
  console.log(storedProduct);
  if (storedProduct) {
    // Parsea la cadena almacenada en localStorage para convertirla de nuevo en un objeto.
    productoSeleccionado.value = JSON.parse(storedProduct);
  }
  console.log(productoSeleccionado.value);
});
/*
******************************************************************************************
@method funcion que actualiza la memoria con un item mas añadido al carrito
******************************************************************************************
*/
const agregarAlCarro = () => {
  // Recupera el array del carrito desde localStorage
  const carritoGuardado = localStorage.getItem('carrito');
  // Inicializa el array si no existe en localStorage
  const productosComprados = carritoGuardado ? JSON.parse(carritoGuardado) : [];
  // Agrega el producto seleccionado al array
  productosComprados.push(productoSeleccionado.value);
  // Guarda el array actualizado en localStorage
  localStorage.setItem('carrito', JSON.stringify(productosComprados));
  emit('productoAgregado', 1);
  
};

</script> 
<!--////////////////////////////////////////TEMPLATE////////////////////////////////////////-->  
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

  <button class="comprar" @click="agregarAlCarro()">AÑADIR A LA CESTA</button>
</template>
<!--///////////////////////////////////////STYLE///////////////////////////////////////-->  
<style scoped>
/* Estilos específicos para la tarjeta del producto */
</style>
