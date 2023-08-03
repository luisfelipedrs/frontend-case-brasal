<template>
  <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Login</h1>
      <div class="form-floating">
        <input v-model="login.username" type="text" class="form-control" id="floatingInput" placeholder="Usuário">
        <label for="floatingInput">Usuário</label>
      </div>
      <div class="form-floating">
        <input v-model="login.password" type="password" class="form-control" id="floatingPassword" placeholder="Senha">
        <label for="floatingPassword">Senha</label>
      </div>
      <button class="btn btn-primary w-100 py-2" type="submit">Enviar</button>
    </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import userStore from '@/store/user';
import api from '@/services/api';

export default defineComponent({
    name: 'LoginView',
    setup() {
      const login = reactive({
        username: '',
        password: ''
      });

      const router = useRouter();

      const submit = async () => api.post('/login', { 
        username: login.username,
        password: login.password,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token),
        localStorage.setItem('user', response.data.username)
        userStore.login(response.data.token, response.data.username),
        router.push('/');
      }, (error) => {
        login.username = '';
        login.password = '';
        console.log(error);
      });

      return { login, userStore, submit }
    }
})
</script>

<style>
</style>