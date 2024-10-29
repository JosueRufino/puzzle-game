// plugins/theme.js
export default defineNuxtPlugin((nuxtApp) => {
    const setTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    };
  
    // Define o tema inicial
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
  
    // Função para alternar o tema
    const toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    };
  
    // Injeta a função toggleTheme no NuxtApp
    return {
      provide: {
        toggleTheme,
      },
    };
  });
  