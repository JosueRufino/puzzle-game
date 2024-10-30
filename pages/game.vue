<template>
  <div>
    <Sidebar
      @logout="logout"
      :timeLeft="timeLeft"
      :turns="turns"
      :selectedMode="selectedMode"
      :startGame="isGame"
      @reinit="reiniciarJogo"
      @backToInit="backToInit"
    >
      <div
        v-if="!isGame"
        class="d-flex justify-content-center align-items-center h-75"
      >
        <div
          class="card bg- w-25 p-3"
          :style="{
            background: isDarkMode ? ' #1a1b1b' : '#f1f1f1f1',
            color: isDarkMode ? '#ffffff' : '#000000',
            transition: 'background 0.3s, color 0.3s',
          }"
          style="height: 300px"
        >
          <div class="d-flex justify-content-center">
            <img src="/assets/puzzle.png" style="width: 60px; height: 60px" />
          </div>
          <div class="text-center text-white mt-3">
            <p
              class="mb-0"
              :style="{
                color: isDarkMode ? '#ffffff' : '#000000',
              }"
            >
              Bem vindo ao
            </p>
            <h4
              :style="{
                color: isDarkMode ? '#ffffff' : '#000000',
              }"
            >
              Otaku Puzzle
            </h4>
          </div>
          <div class="mt-3">
            <label style="font-size: 0.7rem">Escolha o modo de jogo</label>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="selectedMode"
            >
              <option value="zen">Zen</option>
              <option value="classic">Clássico</option>
              <option value="timer">Contra o relógio</option>
            </select>
            <button
              :class="
                !isDarkMode ? 'btn btn-outline-dark' : 'btn btn-outline-light'
              "
              class="w-100 mt-3"
              @click="startGame()"
            >
              Iniciar partida
            </button>
          </div>
        </div>
      </div>
      <div v-else class="content d-flex justify-content-center">
        <Audio />

        <div class="row w-100">
          <div
            class="col-6"
            :style="{
              background: theme ? ' #1a1b1b' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#000000',
              transition: 'background 0.3s, color 0.3s',
            }"
          >
            <div>
              <div
                id="board"
                :style="{
                  background: theme ? ' #1a1b1b' : '#ffffff',
                  color: isDarkMode ? '#ffffff' : '#000000',
                  transition: 'background 0.3s, color 0.3s',
                }"
              >
                <img
                  :style="{ border: borderStyle }"
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
            {{ theme }}
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
          </div>
        </div>
      </div>
      <RecordUsers :timer="timerRecords" :classic="ClassicRecords" />
      <Profile :profile="loggedUser" />
    </Sidebar>
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
const isInit = ref(false);

const valor = useState("valorCompartilhado");
const isDarkMode = ref(valor);

// Exemplo: verificação do tema atual
console.log("Tema atual:", isDarkMode.value ? "Dark" : "Light");
console.log("Valor compartilhado:", valor.value);

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

const backToInit = () => {
  isGame.value = false;
  timeLeft.value = 60;
  turns.value = 0;
  isWon.value = false;
  currTile = null;
  currIndex = null;
  localStorage.removeItem("puzzleGame");
};

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
      localStorage.removeItem("puzzleGame");
      localStorage.removeItem("isGame");
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
    isInit.value = true;

    // Verifica se o jogador já venceu e mostra o Swal
    if (isWon.value) {
      isInit.value = false;
      //showWinModal();
    }
  } else {
    isInit.value = true;
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
  let image = "";
  if (selectedMode.value === "zen") image = "images3";
  else if (selectedMode.value === "timer") image = "images";
  else image = "images2";
  return `/assets/${image}/${filename}`;
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
    addRecord();
    turns.value = 0;
    timeLeft.value = 0;
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
      turns: turns.value, // Não aplicável no modo contra o relógio
      time: tempoGasto, // Record de tempo para o modo contra o relógio
      mode: "timer",
    };
  } else {
    return; // Não salva record para o modo Zen
  }
  console.log("sendo adicionado", newRecord);
  console.log("turns", turns.value);
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
const isGame = ref(false);
const startGame = () => {
  isGame.value = true;
  localStorage.setItem("isGame", isGame.value);
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

// Função para verificar se o username já existe
let data = [];
const getUsers = async () => {
  const response = await fetch(`http://localhost:4000/users`);
  data = await response.json();
  console.log("USERSS>>>", data);
  return data.length > 0; // Retorna todos os usuários
};

const borderStyle = computed(() => {
  return `0.5px solid ${isDarkMode.value ? "black" : "lightgray"}`;
});

onMounted(() => {
  isGame.value = localStorage.getItem("isGame");
  initGame();
  loadUserFromStorage();
  getUsers();
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
  width: 100%;
  display: flex;
}
</style>
