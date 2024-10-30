<!-- src/components/BackgroundAudio.vue -->
<template>
  <audio ref="backgroundAudio" loop>
    <source v-if="mode === 'timer'" src="/assets/music/background-music.M4A" type="audio/mpeg" />
    <source v-else-if="mode === 'classic'" src="/assets/music/pain.M4A" type="audio/mpeg" />
    <source v-else src="/assets/music/jujutsu.M4A" type="audio/mpeg" />
  </audio>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps(["mode"])
const backgroundAudio = ref(null);

onMounted(() => {
  backgroundAudio.value = document.querySelector("audio");
  backgroundAudio.value.play().catch((error) => {
    console.error("Erro ao tocar o áudio: ", error);
  });
});
</script>
