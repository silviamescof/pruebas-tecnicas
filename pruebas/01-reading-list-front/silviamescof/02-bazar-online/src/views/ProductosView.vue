<template>
    <article class="productosview">
      <div class="logopeque">    
        <img class="logopeque" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8eVhW_B-z8OxTwZfEDcyM6jS_95uRhz9V_A&usqp=CAU" alt="Logo de la empresa">
      </div>
       <!-- Agrega un evento de submit al formulario -->
     <form @submit.prevent="nuevoValor" class="formSpan">
      <!-- Usa v-model para enlazar el valor del input a un dato en el componente -->
      <input v-model="terminoBusqueda" type="text" name="buscador" placeholder="laptops, smartphones, prices, ..." class="a">
      <input type="submit" value="BUSCAR" class="submit">
      
    </form>
    <p>Resultados de busqueda para {{ terminoBusqueda }} : {{ resultados.length }} </p>
  
  <span v-for="(cantidad, categoria) in categorias" class="categoria">{{ cantidad.toString() }}</span>




    <!-- Iterar sobre resultados y renderizar el componente Producto -->
    <div class="columnas">
      <div v-for="(producto, index) in resultados" :key="index" >
      <Producto :producto="producto"></Producto>
    </div>
    </div>
    
    
    </article>
   
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Producto from './../components/Producto.vue'

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

const terminoBusqueda = ref<string>('');
const resultados = ref<Producto[]>([]); // Cambiado a ref para poder mutar la lista
const route = useRoute();
const categorias = ref<Map<string, number>>(new Map());

const determinarCategorias = () => {
 // Reinicializar el mapa antes de volver a contar
 categorias.value.clear();

// Recorrer el array de resultados
resultados.value.forEach(producto => {
  // Obtener la categoría del producto
  const categoria = producto.category.toString();

  // Incrementar el contador en el mapa
  if (categorias.value.has(categoria)) {
    categorias.value.set(categoria, categorias.value.get(categoria)! + 1);
  } else {
    categorias.value.set(categoria, 1);
  }
});

};

// Llamar a la función para probar
determinarCategorias();


const hacerPeticion = async () => {

  const url = 'https://apibazaronline.onrender.com/api/items?q='+terminoBusqueda.value;

  try {
    const response = await fetch(url);
    const data = await response.json();
    resultados.value = data.items; // Almacena los resultados en el dato reactivo
    determinarCategorias();
  } catch (error) {
    console.error('Error al obtener resultados:', error);
  }
};
const nuevoValor = () =>{
  hacerPeticion();
}
onMounted(async () => {
  // Accede al parámetro de búsqueda desde route.query
  if (typeof route.query.q === 'string') {
    terminoBusqueda.value = route.query.q; 
  }
  hacerPeticion();
});
</script>


<style scoped>
/* Estilos específicos para la vista de resultados de productos */
</style>
