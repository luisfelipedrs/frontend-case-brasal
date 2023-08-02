<template>
  <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Login</h1>

      <div class="form-floating">
        <input v-model="data.username" type="text" class="form-control" id="floatingInput" placeholder="Usuário">
        <label for="floatingInput">Usuário</label>
      </div>
      <div class="form-floating">
        <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Senha">
        <label for="floatingPassword">Senha</label>
      </div>
      <button class="btn btn-primary w-100 py-2" type="submit">Enviar</button>
    </form>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import userStore from '@/store/user';

export default {
    name: 'LoginView',
    setup() {
      const data = reactive({
        username: '',
        password: ''
      });

      const router = useRouter();

      const submit = async () => {
        const response = await fetch('http://localhost:7070/api/v1/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // credentials: 'include',
            body: JSON.stringify(data)
        });

        const { token, user } = await response.json();

        if (response.ok) {
          localStorage.setItem('token', token)
          localStorage.setItem('user', user.username)
          userStore.login(token, user);
          await router.push('/');
        }
      }

      return { data, userStore, submit }
    }
}
</script>