<template>
  <div class="w-100">
    <ul class="nav nav-tabs w-100">
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'home' }"
          @click="activeTab = 'home'"
          type="button"
        >Clássico</button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :class="{ active: activeTab === 'profile' }"
          @click="activeTab = 'profile'"
          type="button"
        >Contra o Relógio</button>
      </li>
    </ul>

    <div class="tab-content mt-3" >
      <div v-if="activeTab === 'home'">
        <p class="text-white" style="font-size: .7rem;">Recordes do modo clássico</p>
       
        <RecordTable :records="classic"  mode="classic"/>
       
        
      </div>
      <div v-if="activeTab === 'profile'">
        <p class="text-white" style="font-size: .7rem;">Recordes do modo contra relógio</p>
        <RecordTable :records="timer" mode="timer"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  timer: Array,
  classic: Array
});

const activeTab = ref("home");

</script>

<style scoped>
.nav-tabs .nav-link.active {
  background-color: #007bff;
  color: white;
}
.table {
  width: 100%;
}
</style>
