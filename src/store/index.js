import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

import dogs from "./modules/dogs";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["dogs"],
});

export default createStore({
  modules: {
    dogs,
  },
  plugins: [vuexLocal.plugin],
});
