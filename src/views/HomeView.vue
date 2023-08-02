<template>
    <div v-if="!userStore.getters.isLoggedIn">nao logado</div>
    <div v-else>logado, {{ userStore.state.username }}</div>
</template>

<script lang="ts">
import userStore from '@/store/user';
import { onMounted } from 'vue';

export default {
    name: 'HomeView',
    setup() {
        onMounted(userStore.getUser);
        return { userStore }
    }
}
</script>