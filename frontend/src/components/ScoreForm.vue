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
  <div>
    <input v-model="name" placeholder="Name" maxlength="50" />
    <input v-model.number="score" type="number" placeholder="Score" />
    <button @click="onSubmit">Submit</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>