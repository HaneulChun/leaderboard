<script setup lang="ts">
import { ref } from 'vue'
import { submitScore } from '@/services/api'

const emit = defineEmits<{ submitted: [] }>()

const name = ref('')
const score = ref<number | null>(null)
const error = ref('')

async function onSubmit() {
  error.value = ''
  if (!name.value.trim() || score.value === null) {
    error.value = 'Enter a name and a score'
    return
  }
  try {
    await submitScore(name.value.trim(), score.value)
    name.value = ''
    score.value = null
    emit('submitted')
  } catch {
    error.value = 'Could not submit score'
  }
}
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="row">
      <input v-model="name" placeholder="Name" maxlength="50" />
      <input v-model.number="score" type="number" placeholder="Score" />
      <button type="submit">Submit</button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<style scoped>
.form {
  margin-bottom: 1.5rem;
}

.row {
  display: flex;
  gap: 0.5rem;
}

input {
  min-width: 0;
  padding: 0.65rem 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  background: #f8fafc;
  color: inherit;
  transition: border-color 0.15s, box-shadow 0.15s;
}

input:first-child {
  flex: 2;
}

input[type='number'] {
  flex: 1;
}

input:focus {
  outline: none;
  border-color: #6366f1;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

button {
  padding: 0.65rem 1.2rem;
  border: none;
  border-radius: 10px;
  background: #6366f1;
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.15s, transform 0.05s;
}

button:hover {
  background: #4f46e5;
}

button:active {
  transform: translateY(1px);
}

.error {
  margin: 0.6rem 0 0;
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
}

@media (max-width: 480px) {
  .row {
    flex-direction: column;
  }
}
</style>
