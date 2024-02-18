 <!--////////////////////////////////////////TEMPLATE///////////////////////////////////////-->  
<template>
  <div class="carrito" @click="abrirCarro">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScLIa1hPUD6ifDyhr30xagvpGGpHvKd7Uz-A&usqp=CAU" alt="carrito de la compra">
    <span class="numarticulos">{{ listaCompra.length }}</span>
  </div>
  <div v-if="carritoAbierto" class="carrito-expandido">
  <div class="tarjetaCarro">
    <h2>Carrito de Compras</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Producto</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in listaCompra" :key="producto?.id">
          <td></td>
          <td>{{ producto?.title }}</td>
          <td>{{ producto?.price }}€</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Totales</td>
          <td>{{ listaCompra.length }}</td>
          <td>{{ precioTotal }} €</td>
        </tr>
      </tfoot>
    </table>
    <button @click="cerrarCarrito" class="cerrarCarrito">COMPRAR TODO Y CERRAR</button>
  </div>
</div>
</template>
<!--////////////////////////////////////////SCRIPT////////////////////////////////////////-->  

<script setup lang="ts">
  import type { Producto } from '@/services/interfaces';
  import { ref,defineEmits,computed } from 'vue';
  
  // Utiliza un ref para controlar si el carrito está abierto o cerrado
  const carritoAbierto = ref(false);
  const emit = defineEmits(['productoAgregado']);
  const listaCompra = ref<Producto[]>([]);
  const carritoGuardado = localStorage.getItem('carrito');
  listaCompra.value = carritoGuardado ? JSON.parse(carritoGuardado) : [];
  /*
******************************************************************************************
@Computed Propiedad computada que recorre los productos y calcula el total de los precios
******************************************************************************************
*/
const precioTotal = computed(() =>
{
  return listaCompra.value.reduce((total, producto) => total + producto.price, 0);
});
/*
******************************************************************************************
@method funcion que cambia el valor a abierto del carrito cuando se pincha en el carrito, 
y esa propiedad se usa para mostrar el div que hace de carrito abierto
******************************************************************************************
*/  
const abrirCarro = () => {
  carritoAbierto.value = true;
};
/*
******************************************************************************************
@method funcion que cambia el valor a abierto del carrito cuando se pincha comprar y cerrar, 
y esa propiedad se usa para vaciar la memoria y cerrar la ventana
******************************************************************************************
*/ 
const cerrarCarrito = () => {
  carritoAbierto.value = false;
  localStorage.setItem('carrito','');
  emit('productoAgregado', 1);
};
</script>
<!--////////////////////////////////////////STYLE////////////////////////////////////////--> 
<style scoped>

</style>
  