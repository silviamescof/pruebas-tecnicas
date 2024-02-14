<template>
    <div class="carrito">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScLIa1hPUD6ifDyhr30xagvpGGpHvKd7Uz-A&usqp=CAU" alt="carrito de la compra">
        <span class="numarticulos">{{ articulos }}</span>
    </div>
</template>
<script script setup lang="ts">

import {ref} from 'vue';
const articulos = ref<number>(0);

</script>
<style></style>