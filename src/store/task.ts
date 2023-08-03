import { computed, reactive } from "vue";
import Task from '@/views/HomeView.vue';
import userStore from '@/store/user';

const state = reactive({
    total: 0,
    tasks: Array.of(Task)
})

const getters = reactive({
    totalTasks: computed(() => state.total),
    tasks: computed(() => state.tasks)
})

const actions = {
    // setTasks(tasks: typeof Task[]) {
    //     state.tasks = tasks;
    // },
    async setTasks() {
        const response = await fetch('http://localhost:7070/api/v1/tasks', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userStore.state.token
            }
        })

        const { docs, totalPages } = await response.json();

        state.tasks = docs;
        // state.totalTasks = totalPages;
    }
}

export default { state, getters, ...actions }