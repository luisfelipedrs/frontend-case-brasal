<template>
  <NavBar/>
  <router-view/>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue';

export default {
  components: { NavBar }
}
</script>

<style>
html,
body {
  height: 100%;
}

.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input {
  margin-bottom: -1px;
  border-radius: 10px;
}
</style>