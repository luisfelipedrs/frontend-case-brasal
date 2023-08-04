import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import NewTaskView from '@/views/NewTaskView.vue';
import UpdateTaskView from '@/views/UpdateTaskView.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/new', component: NewTaskView },
  { path: '/update/:id', name: 'update', component: UpdateTaskView }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
