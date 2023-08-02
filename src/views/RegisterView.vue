<template>
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Cadastre-se</h1>

      <div class="form-floating">
        <input v-model="data.username" class="form-control" id="floatingInput" placeholder="text">
        <label for="floatingInput">Usuário</label>
      </div>
      <div class="form-floating">
        <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Senha</label>
      </div>
      <div class="form-floating">
        <input v-model="data.confirmPassword" type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Confirme sua senha</label>
      </div>
      <button class="btn btn-primary w-100 py-2" type="submit">Enviar</button>
    </form>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
    name: 'RegisterView',
    setup() {
        const data = reactive({
            username: '',
            password: '',
            confirmPassword: ''
        });

        const router = useRouter();

        const submit = async () => {
            await fetch('http://localhost:7070/api/v1/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            await router.push('/login');
        }

        return { data, submit }
    }
}
</script>