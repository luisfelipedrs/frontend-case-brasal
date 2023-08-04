<template>
    <div class="container d-flex justify-content-center align-items-center flex-column mt-5">
        <h1 >A solução para organizar sua vida e seu trabalho.</h1>
        <h3>Clique aqui para começar, é grátis.</h3>
        <router-link to="/register" class="btn btn-primary btn-lg w-25 m-5">Cadastre-se</router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomePage'
})
</script>
