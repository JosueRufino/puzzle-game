<template>
  <div class="auth d-flex justify-content-end align-items-center">
    <div class="container">
      <h4 class="mb-4">Josué's Puzzle Challenge</h4>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Deseja fazer login ou registro?
        </label>
        <select
          class="form-select"
          aria-label="Default select example"
          v-model.number="option"
        >
          <option :value="1">Login</option>
          <option :value="2">Registro</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="username" class="form-label"> Nome de usuário </label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="username"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Senha</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          required
        />
      </div>
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-light" @click="handleSubmit">
          {{ option === 1 ? "Entrar" : "Registrar" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2"; // Importa o SweetAlert

definePageMeta({
  middleware: ["game"], // Aplica o middleware 'auth' a esta página
});

const router = useRouter();

const option = ref(1);
const username = ref("");
const password = ref("");
const audio = ref(null);

// Função para verificar se o username já existe
const checkUserExists = async (username) => {
  const response = await fetch(
    `http://localhost:4000/users?username=${username}`
  );
  const data = await response.json();
  return data.length > 0; // Retorna true se o usuário já existir
};

// Restante do código permanece o mesmo...
const handleSubmit = async () => {
  // Validação de campos vazios
  if (!username.value || !password.value) {
    Swal.fire({
      title: "Atenção",
      text: "Por favor, preencha todos os campos.",
      icon: "warning",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  if (option.value === 1) {
    // Lógica de login
    const response = await fetch(
      "http://localhost:4000/users?username=" +
        username.value +
        "&password=" +
        password.value
    );
    const data = await response.json();

    if (data.length > 0) {
      // Armazena os dados do usuário no localStorage
      localStorage.setItem("loggedUser", JSON.stringify(data[0]));
      Swal.fire({
        title: "Sucesso!",
        text: "Login bem-sucedido!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      }); // SweetAlert de sucesso
      router.push("/game");
    } else {
      Swal.fire({title:"Erro", text:"Usuário ou senha inválidos.", icon:"error", showConfirmButton: false, timer:2000});
    }
  } else {
    // Lógica de registro
    const userExists = await checkUserExists(username.value);

    if (userExists) {
      Swal.fire({
        title: "Atenção",
        text: "O nome de usuário já está em uso. Por favor, escolha outro nome de usuário.",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const newUser = {
      username: username.value,
      password: password.value,
      records: [],
    };

    await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    Swal.fire({
      title: "Registro bem-sucedido!",
      text: "Faça login para entrar no jogo!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    }); // SweetAlert de sucesso
  }
};

// Função para recuperar os dados do usuário
const loadUserFromStorage = () => {
  const user = localStorage.getItem("loggedUser");
  if (user) {
    const loggedUser = JSON.parse(user);
    console.log("Usuário logado:", loggedUser); // Você pode usar esses dados na sua aplicação
  }
};

// Carregar usuário ao iniciar
loadUserFromStorage();
</script>

<style scoped>
.auth {
  background-image: url("/assets/backAuth.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  padding: 20px;
  display: flex;
}

.container {
  width: 400px;
  background-color: black;
  opacity: 0.7;
  padding: 20px;
  color: white;
  border-radius: 10px;
}

.invisible-btn {
  position: absolute; /* Para posicionar fora da tela */
  left: -9999px; /* Esconde o botão */
}
</style>
