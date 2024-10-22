// middleware/auth.js
export default function ({ redirect, route }) {
  // Verifica se o usuário está autenticado
  const user = localStorage.getItem("loggedUser"); // ou qualquer chave que você use para armazenar o usuário

  // Se o usuário não estiver autenticado
  if (!user) {
    return navigateTo("/");
  }
 

  // Se o usuário estiver autenticado e acessando outras páginas, permita o acesso
}
