<template>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Recordes globais</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
          
            <div class="w-100">
              <ul class="nav nav-tabs w-100">
                <li class="nav-item">
                  <button
                    class="nav-link"
                    :class="{ active: activeTab === 'home' }"
                    @click="activeTab = 'home'"
                    type="button"
                  >
                    Clássico
                  </button>
                </li>
                <li class="nav-item">
                  <button
                    class="nav-link"
                    :class="{ active: activeTab === 'profile' }"
                    @click="activeTab = 'profile'"
                    type="button"
                  >
                    Contra o Relógio
                  </button>
                </li>
              </ul>
  
              <div class="tab-content mt-3">
                <!-- Tabela de recordes do modo clássico -->
                <div v-if="activeTab === 'home'">
                  <p class="text-dark" style="font-size: 0.7rem">
                    Recordes do modo clássico
                  </p>
                  <!-- Passando os records para o RecordTable -->
                  <RecordTable :records="classicRecords" mode="classic" :isGlobal ="true"  />
                </div>
  
                <!-- Tabela de recordes do modo contra o relógio -->
                <div v-if="activeTab === 'profile'">
                  <p class="text-dark" style="font-size: 0.7rem">
                    Recordes do modo contra relógio
                  </p>
                  <!-- Passando os records para o RecordTable -->
                  <RecordTable :records="timerRecords" mode="timer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup>
import { ref, computed, onMounted } from 'vue';

// Estado para o tab ativo
const activeTab = ref('home');

// Função para buscar os usuários
const users = ref([]);
const getUsers = async () => {
  try {
    const response = await fetch('http://localhost:4000/users');
    users.value = await response.json();
  } catch (error) {
    console.error('Erro ao buscar os usuários:', error);
  }
};

// Função para obter o maior recorde para cada modo (timer ou classic)
const getHighestRecordForMode = (userRecords, mode) => {
  return userRecords
    .filter(record => record.mode === mode)
    .sort((a, b) => {
      if (mode === 'timer') {
        return a.time - b.time;
      }
      return a.turns - b.turns;
    })[0];
};

// Computed properties para os maiores records de cada modo
const classicRecords = computed(() => {
  return users.value
    .map(user => {
      const highestRecord = getHighestRecordForMode(user.records, 'classic');
      if (highestRecord) {
        return { ...highestRecord, username: user.username };
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.turns - b.turns); // Ordena pelo menor número de movimentos
});

const timerRecords = computed(() => {
  return users.value
    .map(user => {
      const highestRecord = getHighestRecordForMode(user.records, 'timer');
      if (highestRecord) {
        return { ...highestRecord, username: user.username };
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.time - b.time); // Ordena pelo menor tempo
});

// Carrega os usuários ao montar o componente
onMounted(() => {
  getUsers();
});
</script>
