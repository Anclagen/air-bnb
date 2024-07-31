export default {
  root: "./",
  base: "./",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "bootstrap/scss/bootstrap";`,
      },
    },
  },
  server: {
    port: 5000,
  },
  build: {
    outDir: "dist",
    assetsDir: "./",
  },
};
