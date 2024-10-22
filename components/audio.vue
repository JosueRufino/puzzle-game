<!-- src/components/BackgroundAudio.vue -->
<template>
  <audio ref="backgroundAudio" loop>
    <!--<source src="/assets/music/background-music.M4A" type="audio/mpeg" />-->
  </audio>
</template>

<script setup>
import { onMounted, ref } from "vue";

const backgroundAudio = ref(null);

onMounted(() => {
  backgroundAudio.value = document.querySelector("audio");
  backgroundAudio.value.play().catch((error) => {
    console.error("Erro ao tocar o áudio: ", error);
  });
});
</script>
