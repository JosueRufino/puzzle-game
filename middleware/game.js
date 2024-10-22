// middleware/auth.js
export default function ({ redirect, route }) {
  // Verifica se o usuário está autenticado
  const user = localStorage.getItem("loggedUser"); // ou qualquer chave que você use para armazenar o usuário

  // Se o usuário estiver autenticado
  if (user) {
    return navigateTo("/game");
  }
}
