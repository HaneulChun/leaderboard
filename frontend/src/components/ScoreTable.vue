<script setup lang="ts">
import type { Player } from '@/services/api'

defineProps<{ players: Player[] }>()

const medals = ['🥇', '🥈', '🥉']
</script>

<template>
  <table>
    <thead>
      <tr>
        <th class="rank">Rank</th>
        <th>Name</th>
        <th class="score">Score</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(p, i) in players"
        :key="`${p.name}-${i}`"
        :class="{ top: i < 3 }"
      >
        <td class="rank">{{ medals[i] ?? i + 1 }}</td>
        <td class="name">{{ p.name }}</td>
        <td class="score">{{ p.score.toLocaleString() }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th {
  padding: 0.6rem 0.75rem;
  text-align: left;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #64748b;
  border-bottom: 2px solid #e2e8f0;
}

td {
  padding: 0.8rem 0.75rem;
  border-bottom: 1px solid #f1f5f9;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background: #f8fafc;
}

.rank {
  width: 4rem;
  text-align: center;
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.score {
  width: 6rem;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.top {
  font-weight: 600;
}

.top .score {
  color: #4f46e5;
}
</style>
