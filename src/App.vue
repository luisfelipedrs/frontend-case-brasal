<template>
  <NavBar/>
  <div class="container d-flex justify-content-center align-items-center">
    <router-view class="view"/>
  </div>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue';

export default {
  components: { NavBar }
}
</script>

<style>
.container {
  width: 100%;
  height: 100%;
}

.view {
  width: 100%;
}
</style>