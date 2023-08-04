<template>
  <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Nova tarefa</h1>
      <div class="form-floating">
        <input v-model="data.description" class="form-control" id="floatingInput" placeholder="text">
        <label for="floatingInput">Descrição</label>
        <small class="form-text text-muted" :visible="data.description.length < 3">A descrição deve possuir no mínimo 3 caracteres.</small>
      </div>
      <div class="btn-container">
        <router-link to="/" class="btn btn-danger delete-btn">Cancelar</router-link>
        <button class="btn btn-primary" type="submit" :disabled="data.description.length < 3">Enviar</button>
      </div>
  </form>
</template>

<script lang="ts">
import userStore from '@/store/user';
import { defineComponent, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import Swal from 'sweetalert2';

export default defineComponent({
  name: 'NewTaskView',
  setup() {
    onMounted(userStore.getUser);

    const data = reactive({
      description: '',
    });

    const router = useRouter();

    const config = {
        headers: { 
        'Authorization': 'Bearer ' + userStore.state.token
        }
    }

    const submit = async () => api.post('/tasks', { description: data.description}, config)
    .then(() => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tarefa criada com sucesso!',
            showConfirmButton: false,
            timer: 1000
        });
      router.push('/');
    }, (error) => {
      console.log(error);
    });

    return { userStore, data, submit }
  }
})
</script>

<style>
form {
    height: 100%;
}

.btn-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 30px;
}
</style>