<!--Esta vista contiene un formulario y tiene como funcion hacer una peticion y renderizar la respuesta en funcion del componente que se añada:
  1: la peticion se hace en un inicio al parametro que se le pasa por la ruta
  2: tiene la opcion de hacer nuevas peticiones segun lo que se incuya en el formulario
-->
 <!--////////////////////////////////////////TEMPLATE////////////////////////////////////////-->  
<template>
  <article class="productosview">
    <div class="logopeque">
      <img class="logopeque" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8eVhW_B-z8OxTwZfEDcyM6jS_95uRhz9V_A&usqp=CAU" alt="Logo de la empresa"/>
    </div>
    <!-- Agrega un evento de submit al formulario -->
    <form @submit.prevent="hacerPeticion" class="formSpan">
      <!-- Usa v-model para enlazar el valor del input a un dato en el componente -->
      <input v-model="terminoBusqueda" type="text" name="buscador" placeholder="laptops, smartphones, prices, ..." class="a"/>
      <input type="submit" value="BUSCAR" class="submit" />
    </form>
    <p>
      Resultados de busqueda para {{ terminoBusqueda }} :{{ resultados.length }}
    </p>
    <span v-for="(cantidad, categoria) in categorias" class="categoria">{{cantidad.toString()}}</span>
    <!-- Iterar sobre resultados y renderizar el componente Producto -->
    <div class="columnas">
      <div v-for="(producto, index) in resultados" :key="index">
        <ProductoCom :producto="producto"></ProductoCom>
      </div>
    </div>
  </article>
</template>
 <!--////////////////////////////////////////SCRIPT///////////////////////////////////////-->  
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ProductoCom from "./../components/ProductoCom.vue";
import type { Producto } from "@/services/interfaces";

const terminoBusqueda = ref<string>("");
const resultados = ref<Producto[]>([]); 
const route = useRoute();
const categorias = ref<Map<string, number>>(new Map());
const url =ref('');
/*
*****************************************************************************************
@method funcion que recorre el resultado de busqueda de la pagina y guarda en un MAP
con clave-valor, la acumulacion de categorias y el total de unidades de cada una de ellas
****************************************************************************************
*/
const determinarCategorias = () => 
{
  // Reinicializar el mapa antes de volver a contar
  categorias.value.clear();

  // Recorrer el array de resultados
  resultados.value.forEach((producto) => 
  {
    // Obtener la categoría del producto
    const categoria = producto.category.toString();

    // Incrementar el contador en el mapa
    if (categorias.value.has(categoria)) 
    {
      categorias.value.set(categoria, categorias.value.get(categoria)! + 1);
    } else 
    {
      categorias.value.set(categoria, 1);
    }
  });
};
/*
*****************************************************************************************
@method funcion que realiza peticion a la api
****************************************************************************************
*/
const hacerPeticion = async () => {
  // Verifica si hay un término de búsqueda
  if (terminoBusqueda.value.trim() === '') {
    url.value = 'https://apibazaronline.onrender.com/api/products';
  } else {
    url.value = 'https://apibazaronline.onrender.com/api/items?q=' + terminoBusqueda.value;
  }

  try {
    console.log(url.value);

    const response = await fetch(url.value);
    const data = await response.json();
    console.log(data);
    
    // Verifica si hay resultados antes de asignar a resultados.value
    resultados.value = data.items || data.products || [];
    
    determinarCategorias();
  } catch (error) {
    console.error("Error al obtener resultados:", error);
  }
};

/*
******************************************************************************************
@method funcion que toma el primer valor de la variable termino que es el que se le pasa
a traves de rutas y llama a la primera busqueda
******************************************************************************************
*/
onMounted(async () =>
 {
  // Accede al parámetro de búsqueda desde route.query
  if (typeof route.query.q === "string")
  {
    terminoBusqueda.value = route.query.q;
  }
  hacerPeticion();
  determinarCategorias();
});
</script>
 <!--///////////////////////////////////////STYLE///////////////////////////////////////-->  

<style scoped>
/* Estilos específicos para la vista de resultados de productos */
</style>
