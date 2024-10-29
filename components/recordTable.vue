<template>
  <div style="max-height: 130px; overflow-y: auto">
    <table class="table table-striped w-100" v-if="records.length">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Modo</th>
          <th scope="col" v-if="mode === 'timer'">Tempo</th>
          <th scope="col" v-if="mode === 'classic'">jogadas</th>
          <th scope="col">Usuário</th>
          <th scope="col">Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in records" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ record.mode }}</td>
          <td v-if="mode === 'timer'">{{ record.time }}s</td>
          <td v-if="mode === 'classic'">{{ record.turns }}</td>
          <td>{{  record.username || "Eu"}}</td>
          <td>{{ record.date }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-center">
      <p>Sem recordes</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  records: {
    type: Array,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  isGlobal: {
    type: Boolean,
    required: false,
  },
});


</script>

<style scoped>
.scrollable-table-container::-webkit-scrollbar {
  width: 8px;
}

.scrollable-table-container::-webkit-scrollbar-thumb {
  background: #007bff; /* Color of the scrollbar */
  border-radius: 10px; /* Round edges */
}

.scrollable-table-container::-webkit-scrollbar-track {
  background: #f1f1f1; /* Background color of the scrollbar track */
}
</style>
