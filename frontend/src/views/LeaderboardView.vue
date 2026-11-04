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
  <main class="page">
    <section class="card">
      <h1>🏆 Leaderboard</h1>
      <ScoreForm @submitted="load" />
      <p v-if="loading" class="status">Loading...</p>
      <p v-else-if="error" class="status error">{{ error }}</p>
      <ScoreTable v-else :players="players" />
    </section>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 4rem 1rem;
  background: linear-gradient(160deg, #eef2ff 0%, #f8fafc 60%);
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  color: #1e293b;
  box-sizing: border-box;
}

.card {
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

h1 {
  margin: 0 0 1.5rem;
  text-align: center;
  font-size: 1.9rem;
  letter-spacing: -0.02em;
}

.status {
  text-align: center;
  color: #64748b;
  margin: 1.5rem 0 0;
}

.status.error {
  color: #dc2626;
}
</style>
