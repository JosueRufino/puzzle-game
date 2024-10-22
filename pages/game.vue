<template>
  <!--<div class="d-flex justify-content-center content">
    <div class="row w-100">
      <div class="col-6 d-flex justify-content-end">
        <div style="background-color: white; padding: 5px;">
          <div class="d-flex justify-content-between mb-2">
            <div>
              <p>Josué Rufino</p>
            </div>
            <div>
              <span class="text-white fw-bold">Movimentos:</span>
              <div
                class="d-flex justify-content-between"
                style="
                  background-color: black;
                  opacity: 0.9; /* Aumentei um pouco a opacidade */
                  color: white;
                  border-radius: 3px;
                  padding: 8px; /* Maior espaçamento para melhorar a legibilidade */
                  z-index: 0;
                "
              >
                <icon>icon</icon>
                <span
                  id="text-white fw-bold"
                  style="
                    font-size: 1.2rem; /* Aumenta o tamanho da fonte */
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* Adiciona uma sombra leve */
                  "
                >
                  {{ turns }}
                </span>
              </div>
            </div>
          </div>
          <div id="board">
            <img
              v-for="(tile, index) in boardTiles"
              :key="index"
              :src="getImageSrc(tile.src)"
              draggable="true"
              @dragstart="dragStart($event, tile, index)"
              @dragover.prevent
              @drop="dragDrop($event, index)"
            />
          </div>
          <div id="pieces">
            <img
              v-for="(piece, index) in pieces"
              :key="index"
              :src="getImageSrc(piece.src)"
              draggable="true"
              @dragstart="dragStart($event, piece, index)"
              @dragover.prevent
              @drop="dragDrop($event, -1)"
            />
          </div>
          <h2 v-if="isWon">You won!</h2>
        </div>
      </div>
      <div class="col-6">
        <div class="w-75 h-100" style="background-color: black; opacity: 0.8">
          josue
        </div>
      </div>
    </div>
  </div>-->
  <div class="content d-flex justify-content-center">
    <Audio />
    <div class="row w-100">
      <div class="col-6" style="background-color: white">
        <div>
          <!--<div class="d-flex justify-content-between mb-2">
            <div>
              <p>Josué Rufino</p>
            </div>
            <div>
              <span class="text-white fw-bold">Movimentos:</span>
              <div
                class="d-flex justify-content-between"
                style="
                  background-color: black;
                  opacity: 0.9; /* Aumentei um pouco a opacidade */
                  color: white;
                  border-radius: 3px;
                  padding: 8px; /* Maior espaçamento para melhorar a legibilidade */
                  z-index: 0;
                "
              >
                <icon>icon</icon>
                <span
                  id="text-white fw-bold"
                  style="
                    font-size: 1.2rem; /* Aumenta o tamanho da fonte */
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); /* Adiciona uma sombra leve */
                  "
                >
                  {{ turns }}
                </span>
              </div>
            </div>
          </div>-->
          <div id="board">
            <img
              v-for="(tile, index) in boardTiles"
              :key="index"
              :src="getImageSrc(tile.src)"
              draggable="true"
              @dragstart="dragStart($event, tile, index)"
              @dragover.prevent
              @drop="dragDrop($event, index)"
            />
          </div>
        </div>
      </div>
      <div class="col-6">
        <div id="pieces">
          <img
            style="cursor: grab"
            v-for="(piece, index) in pieces"
            :key="index"
            :src="getImageSrc(piece.src)"
            draggable="true"
            @dragstart="dragStart($event, piece, index)"
            @dragover.prevent
            @drop="dragDrop($event, -1)"
          />
        </div>
        <div style="background-color: black; height: 48%; opacity: 0.8">
          <div class="row w-100 mb-3" style="height: 100%">
            <div class="col-8 h-100">
              <div
                class="p-3 d-flex justify-content-between"
                style="border-bottom: 1px solid lightgray"
              >
                <div class="d-flex">
                  <img
                    src="../public/assets/user.png"
                    style="max-height: 50px"
                  />
                  <div class="ms-2">
                    <p class="mb-0 text-white fw-bold">
                      {{ loggedUser.username }}
                    </p>
                    <span class="text-white">Usuário</span>
                  </div>
                </div>
                <div
                  class="d-flex justify-content-between align-items-end"
                  style="cursor: pointer"
                >
                  <icon @click="showRecords = !showRecords"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      style="color: white"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-table"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z"
                      /></svg
                  ></icon>
                  <icon style="margin-left: 8px">
                    <svg
                      style="color: white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-moon-stars-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"
                      />
                      <path
                        d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"
                      />
                    </svg>
                  </icon>
                  <div>
                    <icon style="margin-left: 8px"
                      ><svg
                        style="color: white"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-brightness-high-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"
                        /></svg
                    ></icon>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-end">
                <div class="mt-5 d-flex">
                  <h6 class="text-center text-white" v-if="!showRecords">
                    Inicie uma partida
                  </h6>
                </div>
                <div v-if="selectedMode === 'timer'" class="text-white">
                  <h1 class="fw-bold">Tempo Restante: {{ timeLeft }}s</h1>
                </div>
                <div v-if="selectedMode === 'classic'" class="text-white">
                  <p class="fw-bold">Movimentos: {{ turns }}</p>
                </div>
                <div
                  v-if="showRecords"
                  class="w-100 d-flex justify-content-center align-items-end mt-2 ms-2"
                >
                  <RecordUsers
                    :timer="timerRecords"
                    :classic="ClassicRecords"
                  />
                </div>
              </div>
            </div>
            <div
              class="col-4 d-flex justify-content-center align-items-center"
              style="border-left: 1px solid lightgray"
            >
              <div class="w-100 me-3">
                <select
                  class="form-select mb-3"
                  aria-label="Default select example"
                  v-model="selectedMode"
                >
                  <option value="zen">Zen</option>
                  <option value="classic">Clássico</option>
                  <option value="timer">Contra o relógio</option>
                </select>
                <button
                  class="btn btn-light w-100 mb-3"
                  style="height: 50px"
                  @click="startGame()"
                >
                  Iniciar
                </button>
                <button
                  class="btn btn-light w-100 mb-3"
                  style="height: 50px"
                  @click="reiniciarJogo()"
                >
                  Reiniciar
                </button>
                <button
                  class="btn btn-light w-100 mb-3"
                  style="height: 50px"
                  @click="logout"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";

definePageMeta({
  middleware: ["auth"], // Aplica o middleware 'auth' a esta página
});

const router = useRouter();

const rows = 4;
const columns = 4;

const turns = ref(0);
const isWon = ref(false);
const boardTiles = ref([]);
const pieces = ref([]);
let currTile = null;
let currIndex = null;
const selectedMode = ref("zen"); // Valor padrão é 'classic'
const timer = ref(null); // Para o modo contra o relógio
const timeLeft = ref(60); // Tempo limite para o modo contra o relógio, por exemplo, 60 segundos
const showRecords = ref(false);

let loggedUser = "";
const loadUserFromStorage = () => {
  const user = localStorage.getItem("loggedUser");
  loggedUser = JSON.parse(user);
  console.log("Usuário logado:", loggedUser); // Você pode usar esses dados na sua aplicação
};

const ClassicRecords = computed(() =>
  JSON.parse(localStorage.getItem("loggedUser")).records.filter(
    (l) => l.mode === "classic"
  )
);

const timerRecords = computed(() =>
  JSON.parse(localStorage.getItem("loggedUser")).records.filter(
    (l) => l.mode === "timer"
  )
);

const logout = () => {
  Swal.fire({
    title: "Logout",
    text: "Tem a certeza que deseja sair?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, tenho",
  }).then((result) => {
    if (result.isConfirmed) {
      clearInterval(timer.value); // Para o cronômetro se estiver ativo
      timeLeft.value = 60; // Reinicia o tempo para 60 segundos
      turns.value = 0;
      isWon.value = false;
      currTile = null;
      currIndex = null;
      localStorage.removeItem("loggedUser");
      router.push("/");
      Swal.fire({
        title: "Logout",
        text: "Logout realizado com sucesso",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  });
};

const initGame = () => {
  const savedGame = JSON.parse(localStorage.getItem("puzzleGame"));
  if (savedGame) {
    turns.value = savedGame.turns;
    isWon.value = savedGame.isWon;
    boardTiles.value = savedGame.boardTiles;
    pieces.value = savedGame.pieces;

    // Verifica se o jogador já venceu e mostra o Swal
    if (isWon.value) {
      showWinModal();
    }
  } else {
    initBoard();
    initPieces();
  }
};

const initBoard = () => {
  const initialTiles = [];
  for (let i = 0; i < rows * columns; i++) {
    initialTiles.push({ src: "blank.jpg", correctIndex: i });
  }
  boardTiles.value = initialTiles;
};

const initPieces = () => {
  const initialPieces = [];
  for (let i = 1; i <= rows * columns; i++) {
    initialPieces.push({ src: `${i}.jpg`, correctIndex: i - 1 });
  }

  // Embaralha as peças
  for (let i = initialPieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [initialPieces[i], initialPieces[j]] = [initialPieces[j], initialPieces[i]];
  }

  pieces.value = initialPieces;
};

const getImageSrc = (filename) => {
  return `/assets/images/${filename}`;
};

const dragStart = (e, tile, index) => {
  currTile = tile;
  currIndex = index;
};

const dragDrop = (e, index) => {
  if (currIndex === -1 || index === -1 || currTile.src.includes("blank")) {
    return;
  }

  const currImg = currTile.src;
  const targetTile = boardTiles.value[index];
  currTile.src = targetTile.src;
  targetTile.src = currImg;

  turns.value += 1;
  checkWin();
  saveGame();
};

// Função para verificar se o jogador venceu
const checkWin = () => {
  for (let i = 0; i < boardTiles.value.length; i++) {
    const tile = boardTiles.value[i];
    if (!tile.src.includes(`${i + 1}.jpg`)) {
      return; // Se qualquer peça estiver fora do lugar, não venceu
    }
  }
  isWon.value = true; // Marca o jogo como vencido
  stopTimer(); // Para o cronômetro quando o jogador vencer
  showWinModal(); // Mostra o modal de vitória
  saveGame();
};

const showWinModal = () => {
  let winMessage = "";

  // Verifica o modo de jogo selecionado
  if (selectedMode.value === "classic") {
    winMessage = `Você venceu o jogo em ${turns.value} movimentos.`;
  } else if (selectedMode.value === "timer") {
    const tempoGasto = 60 - timeLeft.value;
    winMessage = `Você venceu o jogo em ${tempoGasto} segundos.`;
  } else if (selectedMode.value === "zen") {
    winMessage = "Você completou o quebra-cabeça no modo Zen!";
  }

  Swal.fire({
    title: "Parabéns!",
    text: winMessage,
    imageUrl: "/assets/win.png",
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Imagem personalizada",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showCancelButton: true,
    confirmButtonText: "Reiniciar partida",
    cancelButtonText: "Fechar",
  }).then(async (result) => {
    turns.value = 0;
    timeLeft.value = 0;
    addRecord();
    if (result.isConfirmed) {
      // Agora o record é salvo após a confirmação no modal
      reiniciarJogo(); // Reinicia o jogo somente após salvar o record
    }
  });
};

const addRecord = async () => {
  let newRecord;

  // Verifica o usuário logado antes de continuar
  if (!loggedUser || !loggedUser.id) {
    console.error("Usuário não encontrado ou não logado.");
    return;
  }

  // Obter a data atual para o record
  const currentDate = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD

  // Adicionar o novo record com base no modo de jogo
  if (selectedMode.value === "classic") {
    newRecord = {
      date: currentDate,
      turns: turns.value, // Record de movimentos para o modo clássico
      time: null, // Não aplicável no modo clássico
      mode: "classic",
    };
  } else if (selectedMode.value === "timer") {
    const tempoGasto = 60 - timeLeft.value; // Calcula o tempo gasto
    newRecord = {
      date: currentDate,
      turns: null, // Não aplicável no modo contra o relógio
      time: tempoGasto, // Record de tempo para o modo contra o relógio
      mode: "timer",
    };
  } else {
    return; // Não salva record para o modo Zen
  }

  try {
    // Adiciona o novo record à lista de records do usuário logado
    loggedUser.records = loggedUser.records || []; // Verifica se o array de records existe
    loggedUser.records.push(newRecord);
    console.log("User ID:", loggedUser.id);
    console.log("Current Records:", loggedUser.records);
    console.log("Logged Records:", loggedUser);

    // Fazendo o PUT para atualizar o usuário no JSON Server
    const response = await fetch(
      `http://localhost:4000/users/${loggedUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loggedUser),
      }
    );
    console.log("dddd", response);

    if (response.ok) {
      console.log("Record adicionado com sucesso!", response);
      console.log("object", newRecord);
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    } else {
      console.error("Erro ao adicionar record:", response.status);
    }
  } catch (error) {
    console.error("Erro ao adicionar record:", error);
  }
};

const saveGame = () => {
  const gameState = {
    turns: turns.value,
    isWon: isWon.value,
    boardTiles: boardTiles.value,
    pieces: pieces.value,
  };
  localStorage.setItem("puzzleGame", JSON.stringify(gameState));
};

// Função para iniciar o cronômetro no modo "Contra o Relógio"
const startTimer = () => {
  timeLeft.value = 60; // Define o tempo inicial (60 segundos, por exemplo)
  clearInterval(timer.value); // Garantir que qualquer cronômetro anterior seja limpo
  timer.value = setInterval(() => {
    timeLeft.value -= 1; // Decrementa 1 segundo a cada vez
    if (timeLeft.value === 0) {
      clearInterval(timer.value); // Para o cronômetro ao chegar a 0
      // Exibe mensagem quando o tempo acaba
      Swal.fire({
        title: "Tempo Esgotado!",
        text: "Você não conseguiu completar o quebra-cabeça a tempo.",
        icon: "error",
        confirmButtonText: "Tentar Novamente",
      }).then(() => {
        reiniciarJogo(); // Reinicia o jogo quando o jogador confirma
      });
    }
  }, 1000); // Executa a cada 1 segundo (1000 milissegundos)
};

// Função para parar o cronômetro
const stopTimer = () => {
  clearInterval(timer.value); // Para o cronômetro
};

// Função para iniciar o jogo e o cronômetro se o modo for "Contra o Relógio"
const startGame = () => {
  if (selectedMode.value === "timer") {
    startTimer(); // Inicia o cronômetro para o modo "Contra o Relógio"
  }
  turns.value = 0;
  isWon.value = false;
  initBoard();
  initPieces();
};

// Função para reiniciar o jogo
const reiniciarJogo = () => {
  clearInterval(timer.value); // Para o cronômetro se estiver ativo
  timeLeft.value = 60; // Reinicia o tempo para 60 segundos
  turns.value = 0;
  isWon.value = false;
  currTile = null;
  currIndex = null;

  initBoard(); // Redefine o tabuleiro
  initPieces(); // Reembaralha as peças
  saveGame(); // Salva o estado inicial do jogo

  // Reinicia o cronômetro se estiver no modo "Contra o Relógio"
  if (selectedMode.value === "timer") {
    startTimer(); // Reinicia o cronômetro
  }
};
onMounted(() => {
  initGame();
  loadUserFromStorage();
});
</script>

<style scoped>
#board {
  padding-bottom: 10px;
  padding-top: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 5 colunas de tamanho igual */
  grid-template-rows: repeat(4, 1fr); /* 5 linhas de tamanho igual */
}

#board img {
  width: 100%; /* Ocupa todo o espaço da célula */
  height: 100%; /* Ocupa todo o espaço da célula */
  border: 0.5px solid lightblue;
}

#pieces {
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  gap: 2px; /* Espaço entre as peças */
}

#pieces img {
  width: 90px; /* 40px para serem menores */
  height: 90px; /* 40px para serem menores */
  border: 0.5px solid lightblue;
}

.content {
  height: 100vh;
  background-image: url("/assets/game.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 5px;
  width: 100%;
  display: flex;
}
</style>
