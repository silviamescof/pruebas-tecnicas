<template>
  <div class="contenedorDisponibles">
    <div v-for="book in props.books" :key="book.id">
  <div class="tarjeta" @dragstart="dragStart($event, book)" draggable="true">
    <div class="tarjetaImagen">
      <!-- Agrega una comprobación antes de acceder a la propiedad cover -->
      <img v-if="book.book && book.book.cover" class="imagenTodos" :src="book.book.cover" alt="imagen libro" />
    </div>
  </div>
</div>

  </div>
</template>
  
  <script setup >
  import { defineProps } from 'vue';
  
  const props = defineProps({
    books: {
      type: Array ,
      required: true,
    },
  });
  const emits = defineEmits(['dragstart']);
//esta funciona es la primera fase de drag an drops que se produce en el componente hijo//
  const dragStart = (event, book) => {
  // Configurar la información del libro que se está arrastrando
  event.dataTransfer.setData('text/plain', JSON.stringify(book));

  // Emitir el evento dragstart con la información del libro
  emits('dragstart', book.book);
  console.log(book.book);
};
  </script>
  


<style scoped>
    

</style>
