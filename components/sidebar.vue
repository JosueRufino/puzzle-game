<script setup>
import { ref, onMounted } from "vue";
import { useState } from "#app";

const { $toggleTheme } = useNuxtApp();

const isSidebarOpen = ref(false);
const isDarkMode = ref(false);

// Função para alternar a visibilidade da sidebar
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

const valor = useState("valorCompartilhado", () => "valor inicial");
// Modifique `valor` para o que você precisa
valor.value = isDarkMode;
// Verifica o tema atual ao montar
onMounted(() => {
  isDarkMode.value =
    document.documentElement.getAttribute("data-theme") === "dark";
  loadUserFromStorage();
});

// Função para alternar o tema
function toggleTheme() {
  $toggleTheme();
  isDarkMode.value = !isDarkMode.value;
}

// Define o evento de logout
const emit = defineEmits(["logout", "reinit"]);
const props = defineProps(["timeLeft", "turns", "selectedMode", "startGame"]);

// Função para emitir o evento
function emitLogout() {
  emit("logout");
  console.log("emit");
}

function reinit() {
  emit("reinit");
}

function backToInit() {
  emit("backToInit");
}

let loggedUser = "";
const loadUserFromStorage = () => {
  const user = localStorage.getItem("loggedUser");
  loggedUser = JSON.parse(user);
  console.log("Usuário logado:", loggedUser); // Você pode usar esses dados na sua aplicação
};
</script>

<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav
      v-if="!isSidebarOpen"
      class="sidebar"
      id="sidebar"
      :style="{
        color: isDarkMode ? '#fff' : '#000',
        background: isDarkMode ? '#000' : '#fff',
      }"
    >
      <div
        class="sidebar-header d-flex align-items-center"
        :style="{
          background: isDarkMode ? ' #1a1b1b' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#000000',
          transition: 'background 0.3s, color 0.3s',
        }"
      >
        <img src="/assets/puzzle.png" style="width: 50px; height: 50px" />
        <h6 class="ms-3">Otaku Puzzle</h6>
      </div>
      <hr />
      <div
        class="user-profile"
        :style="{
          background: isDarkMode ? '#1a1b1b' : '#f0f0f0',
          color: isDarkMode ? '#ffffff' : '#000000',
          transition: 'background 0.3s, color 0.3s',
        }"
      >
        <img src="../public/assets/user.png" class="profile-pic" />
        <div class="user-info">
          <p class="mb-0 fw-bold">{{ loggedUser?.username }}</p>
          <small>Usuário</small>
          <span class="status ms-2">●</span>
        </div>
      </div>

      <ul class="list-unstyled components">
        <p>Suas opções</p>
        <li data-bs-toggle="modal" data-bs-target="#userProfileModal">
          <a
            :style="{
              color: isDarkMode ? '#ffffff' : '#000000',
            }"
            href="#"
            id="none"
            ><i class="bi bi-person-lines-fill"></i> Perfil</a
          >
        </li>
        <li data-bs-toggle="modal" data-bs-target="#recordModal">
          <a
            :style="{
              color: isDarkMode ? '#ffffff' : '#000000',
            }"
            href="#"
            id="none"
            ><i class="bi bi-table"></i> Meus recordes</a
          >
        </li>
        <li data-bs-toggle="modal" data-bs-target="#exampleModal">
          <a
            :style="{
              color: isDarkMode ? '#ffffff' : '#000000',
            }"
            href="#"
            id="none"
            ><i class="bi bi-globe"></i> Recordes do jogo</a
          >
        </li>
      </ul>
      <ul class="list-unstyled components">
        <li @click="toggleTheme">
          <a
            :style="{
              color: isDarkMode ? '#ffffff' : '#000000',
            }"
            href="#"
            id="none"
            ><i class="bi bi-highlights"></i>Modo</a
          >
        </li>
        <li>
          <a
            :style="{
              color: isDarkMode ? '#ffffff' : '#000000',
            }"
            href="#"
            id="none"
            ><i class="bi bi-gear-fill"></i>Definições</a
          >
        </li>
        <li @click="emitLogout">
          <a
            :style="{
              color: isDarkMode ? '#ffffff' : '#000000',
            }"
            href="#"
            id="none"
            ><i class="bi bi-box-arrow-right"></i>Sair</a
          >
        </li>
      </ul>
    </nav>

    <!-- Page Content -->
    <div id="content">
      <nav
        class="navbar navbar-expand-lg"
        :style="{
          background: isDarkMode ? '#1a1b1b' : '#f0f0f0',
          color: isDarkMode ? '#ffffff' : '#000000',
          transition: 'background 0.3s, color 0.3s',
        }"
      >
        <div class="container-fluid w-100">
          <div
            class="w-100 h-100 d-flex justify-content-between align-items-center"
          >
            <div class="d-flex">
              <button
                @click="toggleSidebar"
                :class="
                  !isDarkMode ? 'btn btn-outline-dark' : 'btn btn-outline-light'
                "
                class="btn btn-md"
                id="sidebarCollapse"
              >
                <i :class="!isSidebarOpen ? 'bi bi-x-lg' : 'bi bi-list'"></i>
              </button>
              <button
                v-if="selectedMode === 'timer' && startGame"
                :class="
                  !isDarkMode ? 'btn btn-outline-dark' : 'btn btn-outline-light'
                "
                class="btn-md ms-2"
                disabled
              >
                <div class="d-flex justify-content-around w-100">
                  <div>
                    <i
                      class="bi bi-stopwatch-fill fs-4"
                      :style="{
                        color: !isDarkMode ? '#000000' : '#ffffff',
                      }"
                    ></i>
                  </div>
                  <div class="ms-3">
                    <h5
                      class="fw-bold mt-1"
                      :style="{
                        color: !isDarkMode ? '#000000' : '#ffffff',
                      }"
                    >
                      {{ timeLeft }}s
                    </h5>
                  </div>
                </div>
              </button>
              <button
                v-if="selectedMode === 'classic' && startGame"
                :class="
                  !isDarkMode ? 'btn btn-outline-dark' : 'btn btn-outline-light'
                "
                class="btn-md ms-2"
                disabled
              >
                <div class="d-flex justify-content-around w-100">
                  <div>
                    <i
                      class="bi bi-arrows-move fs-4"
                      :style="{
                        color: !isDarkMode ? '#000000' : '#ffffff',
                      }"
                    ></i>
                  </div>
                  <div class="ms-3">
                    <h5
                      class="fw-bold mt-1"
                      :style="{
                        color: !isDarkMode ? '#000000' : '#ffffff',
                      }"
                    >
                      {{ turns }}
                    </h5>
                  </div>
                </div>
              </button>
            </div>
            <div v-if="startGame">
              <button
                :class="
                  !isDarkMode ? 'btn btn-outline-dark' : 'btn btn-outline-light'
                "
                class="btn-md me-3"
                @click="backToInit"
              >
                Abandonar jogo
              </button>
              <button
                :class="
                  !isDarkMode ? 'btn btn-outline-dark' : 'btn btn-outline-light'
                "
                class="btn-md me-3"
                @click="reinit"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      </nav>
      <slot />
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700");

li {
  display: flex;
  align-items: center;
}

#none {
  text-decoration: none;
}

body {
  font-family: "Poppins", sans-serif;
  background: #1d1d1d;
  color: #fff;
  margin: 0;
  overflow: hidden;
}

.wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  transition: background 0.3s, color 0.3s;
}

.sidebar {
  width: 300px;
  transition: all 0.3s;
  height: 100vh;
  overflow-y: auto;
  transition: "background 0.3s, color 0.3s";
  border-right: 1px solid #1d1d1d;
}

.sidebar-header {
  padding: 20px;
  font-weight: bold;
  text-transform: uppercase;
}

.user-profile {
  display: flex;
  align-items: center;
  padding: 20px;
}

.user-profile .profile-pic {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.user-profile .user-info {
  font-size: 0.9em;
}

.user-profile .status {
  color: #28a745;
  font-size: 0.8em;
}

.components {
  padding: 20px 0;
  border-bottom: 1px solid #3d3d3d;
}

.components p {
  color: #a0a0a0;
  padding: 10px 20px;
}

.components li a {
  padding: 10px 20px;
  font-size: 1em;
  display: flex;
  align-items: center;
  color: #dcdcdc;
}

.components li a i {
  margin-right: 10px;
}

.components li a:hover {
  color: #fff;
  background: #343a40;
}

#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  overflow-y: auto;
  transition: all 0.3s;
}
</style>
