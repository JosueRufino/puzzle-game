<script setup>
const {
  data: users,
  pending,
  error,
} = await useFetch("http://localhost:4000/users");
</script>

<template>
  <div>
    <div v-if="pending">Carregando...</div>
    <div v-if="error">Erro: {{ error.message }}</div>
    <ul v-if="users">
      <li v-for="user in users" :key="user.id">
        {{ user.username }} - Senha: {{ user.password }}
        <ul>
          <li v-for="record in user.records" :key="record.id">
            Data: {{ record.date }} - Voltas: {{ record.turns }} - Tempo:
            {{ record.time }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
