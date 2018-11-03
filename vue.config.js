module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        moment: "moment/src/moment"
      }
    }
  },
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
