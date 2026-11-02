<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getLeaderboard, type Player } from '@/services/api'
import ScoreTable from '@/components/ScoreTable.vue'
import ScoreForm from '@/components/ScoreForm.vue'

const players = ref<Player[]>([])
const loading = ref(true)
const error = ref('')

async function load() {
  loading.value = true
  error.value = ''
  try {
    players.value = await getLeaderboard(10)
  } catch {
    error.value = 'Could not load leaderboard'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <main>
    <h1>Leaderboard</h1>
    <ScoreForm @submitted="load" />
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <ScoreTable v-else :players="players" />
  </main>
</template>