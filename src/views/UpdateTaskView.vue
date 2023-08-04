<template>
    <form @submit.prevent="submit">
        <h1 class="h3 mb-3 fw-normal">Atualizar tarefa</h1>
        <div class="form-floating">
            <input v-model="data.description" class="form-control" id="floatingInput" placeholder="text">
            <label for="floatingInput">Nova descrição</label>
            <small class="form-text text-muted" :visible="data.description.length < 3">A descrição deve possuir no mínimo 3 caracteres.</small>
        </div>
        <select v-model="data.completed" class="form-select mt-2">
            <option :value="true">Finalizada</option>
            <option :value="false">Pendente</option>
        </select>
        <div class="btn-container">
          <router-link to="/" class="btn btn-danger delete-btn">Cancelar</router-link>
          <button class="btn btn-primary" type="submit" :disabled="data.description.length < 3">Enviar</button>
        </div>
    </form>
  </template>
  
<script lang="ts">
import userStore from '@/store/user';
import { defineComponent, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/services/api';
import Swal from 'sweetalert2';

export default defineComponent({
name: 'UpdateTaskView',
setup() {
	const router = useRouter();
	const route = useRoute();

	const taskId = route.params.id;

	onMounted(() => {
        userStore.getUser;
	});

	const data = reactive({
	description: '',
	completed: false
	});

	const config = {
		headers: { 
		'Authorization': 'Bearer ' + userStore.state.token
		}
	}

	const submit = async () => api.put(`/tasks/${taskId}` , { 
			description: data.description,
			completed: data.completed 
		},
		config)
		.then(() => {
		console.log(taskId)
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Tarefa atualizada com sucesso!',
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