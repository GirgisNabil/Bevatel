<script lang="ts" setup>
import ThemeToggle from '@/components/base/ThemeToggle.vue'
</script>
<template>
  <div class="flex justify-between items-center py-8">
    <div><h1 class="text-3xl font-bold">Bevatel App</h1></div>

    <div>
      <ThemeToggle />
    </div>
  </div>
</template>

<style scoped>
h1 {
  background: -webkit-linear-gradient(135deg, rgb(255, 168, 168) 10%, rgb(252, 255, 0) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
