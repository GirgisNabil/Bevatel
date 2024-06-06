<script setup lang="ts">
import TheHeader from '@/components/layout/TheHeader.vue'
import { Toaster } from '@/components/ui/sonner'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="container">
    <TheHeader />
    <RouterView />
    <Toaster richColors theme="dark" />
  </main>
</template>

<style scoped></style>
