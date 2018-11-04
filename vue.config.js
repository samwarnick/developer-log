module.exports = {
  pluginOptions: {
    apollo: {
      enableMocks: false,
      enableEngine: false
    }
  },
  devServer: {
    proxy: {
      "/auth": {
        target: "http://localhost:4000/"
      }
    }
  }
};
