import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Load store modules dynamically.
const requireContext = require.context("./modules", false, /.*\.ts$/);

const modules = requireContext
  .keys()
  .map((file) => [file.replace(/(^.\/)|(\.ts$)/g, ""), requireContext(file)])
  .reduce((modules, [name, module]) => {
    if (module.namespaced === undefined) {
      module.namespaced = true;
    }

    return { ...modules, [name]: module };
  }, {});

export default new Vuex.Store({
  modules,
});
