<!-- App.vue -->
<template>
  <div class="contenido">
    <div class="disponibles" @dragover="handleDragOver" @dragenter="handleDragEnter" @dragleave="handleDragLeave" @drop="handleDropDisponibles">
      <h1> Libros disponibles: {{allBooks.length}} </h1>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <span class="currentPage">{{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
      </div>
      <div class="genero">
        <label for="filtrar">Filtrar por género:</label>
        <select v-model="selectedGenre" name="filtrar" id="filtrar" placeholder="Todos">
          <option value="">Todos</option>
          <option v-for="genre in genres" :key="genre">{{ genre }}</option>
        </select>
      </div>
      <Libros :books="filteredBooks" ></Libros>
    </div>

    <div class="listaDeLectura"  @dragover="handleDragOver" @dragenter="handleDragEnter" @dragleave="handleDragLeave" @drop="handleDropListaDeLectura">
      <h5>Lista de Lectura: {{ listaDeLectura.length }}</h5>
      <!--{{ zoneDragging ? 'Suelta el libro aqui' : 'Arrastrar para añadir' }}-->
      <Libros :books="listaDeLectura" ></Libros>
    </div>
  </div>
</template>

<script setup>
////////////importaciones/////////
  import Libros from './components/Libros.vue';
  import { ref, onMounted, computed } from 'vue';
  import booksData from './assets/books.json';
/////////////variables/////////
  const allBooks = ref(booksData.library);//esta varible lee los datos
  const currentPage = ref(1); ///esta variable es para indicar la pagina actual
  const booksPerPage = 8;///esta variable es para indicar los libros que se muestran por pagina
  const selectedGenre = ref(''); //esta variable es para leer el dato de filtar por genero
  const listaDeLectura = ref([]); //esta variable es para almacenar los favoritos
  const zoneDragging = ref(false); //esta variables es para comprobar si esta en una zona habilitada para soltar el objeto
  const totalPages = computed(() => {//esta variable es para ver el numero total de paginas que debemos tener
    return Math.ceil(allBooks.value.length / booksPerPage);
  });
  const filteredBooks = computed(() => {//esta variable es para tener una lista filtrada en funcion de la pagima y el genero
    if (selectedGenre.value) {
      return allBooks.value.filter(book => book.book.genre === selectedGenre.value);
    } else {
      const startIndex = (currentPage.value - 1) * booksPerPage;
      const endIndex = startIndex + booksPerPage;
      return allBooks.value.slice(startIndex, endIndex);
    }
  });
  const genres = computed(() => {//esta variable devuelve un array filtrado por generos
    const uniqueGenres = new Set();
    allBooks.value.forEach(book => {
      if (book.book.genre) {
        uniqueGenres.add(book.book.genre);
      }
    });
    return Array.from(uniqueGenres);
  });

  //////////////////////funciones/////////////////////////////
  // esta funcion sirve para aumentar el valor de la pagina actual cuando se escucha el evento
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
// esta funcion sirve para decrementar el valor de la pagina actual cuando se escucha el evento
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
/*Este evento es uno de los que componen el ciclo de vida de drag an drop y sirve para anular
su comportamiento por defecto*/
  const dragOver = (event) => {
    event.preventDefault();
  };
  /*Este evento es uno de los que componen el ciclo de vida de drag an drop y sirve para anular
su comportamiento por defecto*/
  const handleDragOver = (event) => {
    event.preventDefault();
  }
/*Este evento es uno de los que componen el ciclo de vida de drag an drop y sirve para
asignar true  a la variable que indica si estamos dentro de un campo activo para soltar un elemento*/
const handleDragEnter = () => {
  zoneDragging.value=true;
  console.log('variable zoneDragging en handleDragEnter'+zoneDragging.value);
}
/*Este evento es uno de los que componen el ciclo de vida de drag an drop y sirve para
asignar false a la variable que indica si estamos dentro de un campo activo para soltar un elemento*/
const handleDragLeave = () => {
  zoneDragging.value = false;
  console.log('variable zoneDragging en handleDragLeave'+zoneDragging.value);
}
 /*Este evento es uno de los que componen el ciclo de vida de drag an drop y sirve para indicar 
 la logica que se debe hacer cuando se suelta un elemento en la lista de lectura*/
const handleDropListaDeLectura = (event) => {
  event.preventDefault(); //lo primero anular el comportamiento por defecto

  const droppedBookData = event.dataTransfer.getData('text/plain'); //leer el objeto que se esta arrastrando
  const droppedBook = JSON.parse(droppedBookData); //parsearlo de JSON

  // Añadir el libro a listaDeLectura
  listaDeLectura.value.push(droppedBook);
  localStorage.setItem('listaDeLectura', JSON.stringify(listaDeLectura.value));
  console.log(listaDeLectura.value);

  // Eliminar el libro de filteredBooks
  allBooks.value = allBooks.value.filter(book => book.book.ISBN !== droppedBook.book.ISBN);
  localStorage.setItem('allBooks', JSON.stringify(allBooks.value));
  console.log(allBooks.value);
};
 /*Este evento es uno de los que componen el ciclo de vida de drag an drop y sirve para indicar 
 la logica que se debe hacer cuando se suelta un elemento en el apartado de dispobibles*/
const handleDropDisponibles = (event) => {
  event.preventDefault();

const droppedBookData = event.dataTransfer.getData('text/plain');
const droppedBook = JSON.parse(droppedBookData);

// Añadir el libro a allBooks
allBooks.value.push(droppedBook);
localStorage.setItem('allBooks', JSON.stringify(allBooks.value));
console.log(allBooks.value);

// Eliminar el libro de listaDeLectura
listaDeLectura.value = listaDeLectura.value.filter(book => book.book.ISBN !== droppedBook.book.ISBN);
localStorage.setItem('listaDeLectura', JSON.stringify(listaDeLectura.value));
console.log(listaDeLectura.value);
}
///esta funcion es para asignar valores a las variables de localeStorage
onMounted(() => {
  // Cuando el componente se monta, intenta cargar la lista de lectura desde localStorage
  if(localStorage.getItem('listaDeLectura')){
    listaDeLectura.value = JSON.parse(localStorage.getItem('listaDeLectura'));
  }
  if(localStorage.getItem('allBooks')){
    allBooks.value = JSON.parse(localStorage.getItem('allBooks'));
  }
});
//esta funcion sirve para sincronizar los cambios en locale storage en cada cambio que se produzca
window.addEventListener('storage', (event) => {
    // Verificar si el cambio se hizo en la clave 'listaDeLectura'
    if (event.key === 'listaDeLectura') {
      listaDeLectura.value = JSON.parse(event.newValue);
    }

    // Verificar si el cambio se hizo en la clave 'allBooks'
    if (event.key === 'allBooks') {
      allBooks.value = JSON.parse(event.newValue);
    }
  });


</script>





<style>
  .pagination {
    margin: 0% 0% 5% 10%;
  }
  button{
    margin-left: 2%;
    margin-right: 2%;
  }
  .currentPage {
    border: solid white 3px;
    padding: 1% 2% 1.4% 2%;
    border-radius: 100%;
  }
  select{
    color: black;
  }
</style>
