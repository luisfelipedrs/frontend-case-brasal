<template>
    <div v-if="!userStore.getters.isLoggedIn">
        <h2>Você ainda não acessou sua conta</h2>
        <h3>Clique aqui para acessar</h3>
        <router-link to="/login" class="nav-link">Login</router-link>
    </div>
    <div v-else>
        <div>
            Bem-vindo(a), {{ userStore.state.username }}!
        </div>
        <div >
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                <thead>
                    <tr>
                      <th class="th-sm">Tarefa</th>
                      <th class="th-sm">Status</th>
                    </tr>
            </thead>
                <tbody>
                    <tr v-for="(task, i) in tasks" :key="i">
                      <td>{{ task['description'] }}</td>
                      <td>{{ task['completed'] }}</td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.botoesPaginas}>
                <button @click="handlePageChange(pagination.page - 1)" :disabled="pagination.page === 1">&laquo;</button>
                <button @click="handlePageChange(pagination.page + 1)" :disabled="pagination.page === pagination.totalPages">&raquo;</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import userStore from '@/store/user';
import { defineComponent, onMounted, ref, reactive } from 'vue';
import api from '@/services/api';

export default defineComponent({
    name: 'HomeView',
    setup() {
        onMounted(userStore.getUser);

        const tasks = ref([]);

        const pagination = reactive({
            page: 1,
            totalPages: 0
        });

        const handlePageChange = (newPage: number) => {
            pagination.page = newPage;
            fetchTasks();
        };

        const fetchTasks = () => api.get('/tasks?page=' + pagination.page, { 
            headers: { 'Authorization': 'Bearer ' + userStore.state.token }})
        .then((response) => {
            tasks.value = response.data.docs,
            pagination.totalPages = response.data.totalPages
        })

        if (userStore.getters.isLoggedIn) {
            onMounted(fetchTasks);
        }
        
        return { userStore, tasks, pagination, handlePageChange }
    }
})
</script>