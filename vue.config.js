module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
  },
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === "production" ? "/Vue_blog/" : "/",
};
