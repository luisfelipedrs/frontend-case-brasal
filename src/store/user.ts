import { computed, reactive } from "vue";

const state = reactive({
    token: '',
    username: '',

    error: ''
})

const getters = reactive({
    isLoggedIn: computed(() => state.username !== '')
})

const actions = {
    async getUser() {
        const user = localStorage.getItem('user');
        if (user == null) return; 
    
        state.token = localStorage.getItem('token') || '';
        state.username = localStorage.getItem('user') || '';
    },
    async login(token: string, username: string) {
        state.token = token;
        state.username = username;
    },
    async logout() {
        state.token = '';
        state.username = '';
    }
}

export default { state, getters, ...actions }
