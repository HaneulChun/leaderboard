<script setup lang="ts">
import type { Player } from '@/services/api'

defineProps<{ players: Player[] }>()
</script>

<template>
  <table>
    <thead>
      <tr><th>Rank</th><th>Name</th><th>Score</th></tr>
    </thead>
    <tbody>
      <tr v-for="(p, i) in players" :key="`${p.name}-${i}`">
        <td>{{ i + 1 }}</td>
        <td>{{ p.name }}</td>
        <td>{{ p.score }}</td>
      </tr>
    </tbody>
  </table>
</template>