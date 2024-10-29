// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Otaku Puzzle ",
      script: [
        {
          defer: true,
          tagPosition: "bodyClose",
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/static/assets/logo.png",
        },
      ],
      meta: [
        { charset: "utf-8" },
        {
          hid: "author",
          name: "author",
          content: "Devs404",
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "Glory, sino, construção, automoveis, sino glory, empresa de construção em angola",
        },
        {
          name: "description",
          content:
            "É com grande prazer que a glory lhe traz as melhores marcas no mercado de Material Elétrico, clique nas marcas para visitar alguns produtos disponíveis agora Online.",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "format-detection",
          content: "telephone=no",
        },
        {
          name: "robots",
          content: "index, follow",
        },
        {
          name: "googlebot",
          content: "index, follow",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Sino Glory",
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "website",
        },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: "sino Glory",
        },
        {
          property: "og:description",
          content:
            "É com grande prazer que a glory lhe traz as melhores marcas no mercado de Material Elétrico, clique nas marcas para visitar alguns produtos disponíveis agora Online.",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "/static/assets/logo.png",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "/static/assets/logo.png",
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: "/static/assets/logo.png",
        },
        {
          property: "og:locale",
          content: "pt_AO",
        },
      ],
    },
  },
  plugins: ["~/plugins/theme.js"],
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    'bootstrap-icons/font/bootstrap-icons.css'
  ],
  ssr: false,
});
