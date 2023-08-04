<template>
    <div v-if="!userStore.getters.isLoggedIn">
        <home-page>
        </home-page>
    </div>

    <div v-else>
        <div class="title-container">
            <h2>Bem-vindo(a), {{ userStore.state.username }}!</h2>
            <div class="search-container">
                <input v-model="search.text" type="text" class="form-control search-text-input" placeholder="Digite aqui">
                <button @click="searchTask" class="btn btn-primary">Pesquisar</button>
                <router-link to="/new" class="btn btn-primary new-task-btn">Criar tarefa</router-link>
            </div>
        </div>

        <div v-if="tasks.length === 0">
                <h5>Você ainda não possui tarefas.</h5>
            </div>

        <div v-else class="table-container">
            <table class="tasks-table">
                <colgroup>
                    <col span="1" style="width: 5%;">
                    <col span="1" style="width: 66%;">
                    <col span="1" style="width: 10%;">
                    <col span="1" style="width: 20%;">
                </colgroup>
                <thead>
                    <tr>
                      <th>#</th>
                      <th>Tarefas</th>
                      <th>Status</th>
                      <th>Editar</th>
                    </tr>
            </thead>
            

                <tbody>
                    <tr v-for="(task, i) in tasks" :key="i">
                      <td>
                        <div class="form-check container d-flex justify-content-center m-lg-2 checkbox-xl">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="task.completed" @click="updateTaskStatus(task._id)">
                            <label class="form-check-label" for="flexCheckDefault">
                            </label>
                        </div>
                      </td>
                      <td>{{ task.description }}</td>
                            <td v-if="task.completed == false">
                                <button class="btn btn-warning pending">Pendente</button>
                            </td>
                            <td v-else>
                                <button class="btn btn-success done">Finalizada</button>
                            </td>
                      <td>
                        <router-link :to="{ name: 'update', params: { id: task._id }}" class="btn btn-primary"><ion-icon name="create-outline"></ion-icon> Alterar</router-link>
                        <button @click="deleteTask(task._id)" class="btn btn-danger delete-btn"><ion-icon name="trash-outline"></ion-icon> Deletar</button>
                      </td>
                    </tr>
                </tbody>                
            </table>

            <div class="page-buttons">
                <button class="previous" @click="handlePageChange(pagination.page - 1)" :disabled="pagination.page === 1">&laquo;</button>
                <button class="next" @click="handlePageChange(pagination.page + 1)" :disabled="pagination.page === pagination.totalPages">&raquo;</button>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import userStore from '@/store/user';
import { defineComponent, onMounted, ref, reactive, computed } from 'vue';
import api from '@/services/api';
import Swal from 'sweetalert2';
import HomePage from '@/components/HomePage.vue';
import { Task } from '@/interfaces/task-interface';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    name: 'HomeView',
    setup() {
        onMounted(userStore.getUser);
        
        const tasks = ref([] as Task[]);

        const route = useRoute();
        const router = useRouter();

        const id = computed(() => route.params.id);

        const config = {
            headers: {
                'Authorization': 'Bearer ' + userStore.state.token
            }
        };

        const search = reactive({
            text: ''
        });

        const pagination = reactive({
            page: 1,
            totalPages: 0
        });

        const handlePageChange = (newPage: number) => {
            pagination.page = newPage;
            fetchTasks();
        };

        const fetchTasks = async () => api.get(`/tasks?page=${pagination.page}`, {
            headers: { 'Authorization': 'Bearer ' + userStore.state.token }
        })
            .then((response) => {
            console.log(response.data.docs);
            tasks.value = response.data.docs;
            pagination.totalPages = response.data.totalPages;
        });

        const deleteTask = (id: string) => {
            Swal.fire({
                title: 'Tem certeza?',
                text: "Você não poderá reverter essa ação!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, deletar!'
            })
                .then((result) => {
                if (result.isConfirmed) {
                    deleteFromDB(id);
                    Swal.fire('Deletado!', 'Sua tarefa foi deletada com sucesso.', 'success');
                }
            });
        };

        const deleteFromDB = async (id: string) => api.delete(`/tasks/${id}`, config)
            .then(() => {
                fetchTasks();
        }, (error) => {
            console.log(error);
        });

        const updateTaskStatus = async (id: string) => api.patch(`/tasks/${id}`, {}, config)
            .then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Sua tarefa foi alterada!',
                showConfirmButton: false,
                timer: 1000
            });
            console.log(id)
            fetchTasks();
        }, (error) => {
            console.log(error);
        });

        const searchTask = async () => api.get(search.text == '' ? '/tasks' : `/tasks?description=${search.text}`, config)
            .then((response) => {
            search.text = '';
            tasks.value = response.data.docs;
            pagination.totalPages = response.data.totalPages;
        }, (error) => {
            console.log(error);
        });

        if (userStore.getters.isLoggedIn) {
            onMounted(fetchTasks);
        }

        return { 
            userStore,
            tasks, 
            pagination, 
            handlePageChange, 
            deleteTask, 
            updateTaskStatus, 
            search, 
            searchTask,
            id,
            router
        }
    },

    components: { HomePage }
})
</script>

<style>
.title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    gap: 30px;
    padding-bottom: 10px;
    height: 100%;
}

.checkbox-xl {
    scale: 1.4;
 }

.new-task-btn {
    width: 100%;
    margin-left: 50px;
}

.search-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    gap: 10px;
    padding-bottom: 10px;
    height: 100%;
}

.search-text-input {
    margin-bottom: 10px;
}

.tasks-table {
    border-collapse: collapse;
    width: 100%;
}

.tasks-table td, .tasks-table th {
    border: 1px solid #ddd;
    padding: 8px;
}

.tasks-table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #535353;
    color: white;
    font-size: larger;
    font-weight: bolder;
}

.tasks-table td {
    padding: 10px 20px 10px 10px;
    background-color: #eeecec;
}

.delete-btn {
    margin-left: 10px;
}

.page-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
}

.page-buttons button {
    padding: 5px 20px 5px 20px;
    font-size: 20px;
    border: 0;
    background-color: #eeeef0;
}

.previous {
    border-radius: 10px 0 0 10px;
}

.next {
    border-radius: 0 10px 10px 0; 
}

.pending {
    color: white;
    background-color: #f1cd2b;
}

.pending:hover {
    color: white;
    cursor: default;
    background-color: #f1cd2b;
}

.done {
    border: 0;
    background-color: #5cb85c;
}

.done:hover {
    cursor: default;
    background-color: #5cb85c;
}
</style>