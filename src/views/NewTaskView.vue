<template>
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Nova tarefa</h1>

      <div class="form-floating">
        <input v-model="data.description" class="form-control" id="floatingInput" placeholder="text">
        <label for="floatingInput">Descrição</label>
      </div>
      <button class="btn btn-primary w-100 py-2" type="submit">Enviar</button>
    </form>
</template>

<script lang="ts">
import userStore from '@/store/user';
import { defineComponent, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

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
      router.push('/');
    }, (error) => {
      console.log(error);
    });

    return { userStore, data, submit }
  }
})
</script>