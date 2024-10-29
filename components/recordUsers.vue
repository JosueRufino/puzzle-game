<template>
  <div class="w-100">
    <!-- Modal Bootstrap -->
    <div
      class="modal fade"
      id="recordModal"
      tabindex="-1"
      aria-labelledby="recordModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="recordModalLabel">Recordes</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Tabs -->
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

            <!-- Conteúdo das tabs -->
            <div class="tab-content mt-3">
              <div v-if="activeTab === 'home'">
                <p class="text-white" style="font-size: 0.7rem">
                  Recordes do modo clássico
                </p>
                <RecordTable :records="classic" mode="classic" :isGlobal="false"/>
              </div>
              <div v-if="activeTab === 'profile'">
                <p class="text-white" style="font-size: 0.7rem">
                  Recordes do modo contra relógio
                </p>
                <RecordTable :records="timer" mode="timer" :isGlobal="false"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  timer: Array,
  classic: Array,
});

const activeTab = ref("home");
</script>

<style scoped>
.nav-tabs .nav-link.active {
  background-color: #007bff;
  color: white;
}
</style>
