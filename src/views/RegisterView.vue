<template>
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Cadastre-se</h1>

      <div class="form-floating">
        <input v-model="data.username" class="form-control" id="floatingInput" placeholder="text">
        <label for="floatingInput">Usuário</label>
      </div>
      <div class="form-floating">
        <input v-model="data.password" type="password" class="form-control" placeholder="Password">
        <label for="floatingPassword">Senha</label>
      </div>
      <div class="form-floating">
        <input v-model="data.confirmPassword" type="password" class="form-control" placeholder="Password">
        <label for="floatingPassword">Confirme sua senha</label>
      </div>
      <div class="btn-container">
        <router-link to="/" class="btn btn-danger delete-btn">Cancelar</router-link>
        <button class="btn btn-primary" type="submit" 
        :disabled="(data.username.length < 3) 
        || (data.password.length < 3)
        || (data.confirmPassword.length < 3)
        ">Enviar</button>
      </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'RegisterView',
  setup() {
    const data = reactive({
      username: '',
      password: '',
      confirmPassword: ''
    });

    const router = useRouter();

    const submit = async () => api.post('/register', { 
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
      headers: { 'Content-Type': 'application/json' },
    })
    .then(() => {
      Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuário cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 1500
        });
      router.push('/login');
    }, (response) => {
      data.username = '';
      data.password = '';
      data.confirmPassword = '';
      const message: string = response.response.data.message
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message,
        })
    });

    return { data, submit }
  }
})
</script>