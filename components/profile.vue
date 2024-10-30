<template>
  <div>
    <!-- Modal do perfil do usuário -->
    <div
      class="modal fade"
      id="userProfileModal"
      tabindex="-1"
      aria-labelledby="userProfileModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content custom-modal-bg">
          <div class="modal-header">
            <h5 class="modal-title" id="userProfileModalLabel">
              Perfil do Usuário
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-center">
            <!-- Imagem do usuário -->
            <img
              src="../public/assets/user.png"
              alt="Imagem de perfil do usuário"
              class="img-thumbnail rounded-circle profile-image mb-3"
            />

            <!-- Informações do usuário -->
            <ul class="list-group">
              <li class="list-group-item">
                <span class="fw-bold">ID: </span>{{ profile?.id }}
              </li>
              <li class="list-group-item">
                <span class="fw-bold">Username:</span> {{ profile?.username }}
              </li>
              <li class="list-group-item">
                <span class="fw-bold"> Número de Recordes: </span
                >{{ profile?.records?.length }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps(["profile"]);
</script>

<style scoped>
.custom-modal-bg {
  background-color: #ffffff;
  color: #000000;
  border: none;
}

.profile-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>
