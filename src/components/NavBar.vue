<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">Home</router-link>
            <div>
                <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!userStore.getters.isLoggedIn">
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link">Cadastro</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav me-auto mb-2 mb-md-0" v-else>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link" @click="logout">Logout</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import userStore from '@/store/user';
import { onMounted, defineComponent } from 'vue';

export default defineComponent({
    name: 'NavBar',
    setup() {
        onMounted(userStore.getUser);

        const logout = () => {
            localStorage.removeItem('token')
            localStorage.removeItem('user');
            userStore.logout();
        }

        return { userStore, logout }
    }
})
</script>