<template>
  <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Login</h1>
      <div class="form-floating mx-auto">
        <input v-model="login.username" type="text" class="form-control" id="floatingInput" placeholder="Usuário">
        <label for="floatingInput">Usuário</label>
      </div>
      <div class="form-floating">
        <input v-model="login.password" type="password" class="form-control" id="floatingPassword" placeholder="Senha">
        <label for="floatingPassword">Senha</label>
      </div>
      <div class="btn-container">
        <router-link to="/" class="btn btn-danger delete-btn">Cancelar</router-link>
        <button class="btn btn-primary" type="submit" :disabled="(login.username.length < 3) || (login.password.length < 3)">Enviar</button>
      </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import userStore from '@/store/user';
import api from '@/services/api';
import Swal from 'sweetalert2';

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
        localStorage.setItem('user', response.data.user.username)
        userStore.login(response.data.token, response.data.user.user),
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login efetuado com sucesso!',
            showConfirmButton: false,
            timer: 1000
        });
        router.push('/');
      }, (response) => {
        const message: string = response.response.data.message
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message,
        })
        login.username = '';
        login.password = '';
      });

      return { login, userStore, submit }
    }
})
</script>

<style>
.square-box {
  max-width: 600px;
  min-height: 600px;
  border: 1px solid #333;
}

input {
  margin-top: 10px;
}

.btn-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 30px;
}
</style>