import dog from "../../helper/api/dog";

const state = () => ({
  isLoadingDogs: false,
  dogs: [],
  searchedBreeds: [],
});

// getters
const getters = {};

// actions
const actions = {
  async getAllDogs({ commit }) {
    commit("setIsLoadingDogs", true);
    try {
      const data = await dog.fetchDogs();
      const dogs = data.message;
      commit("setDogs", dogs);
      commit("setIsLoadingDogs", false);
    } catch (error) {
      commit("setIsLoadingDogs", false);
      console.log({ error });
    }
  },
  async fecthAdditionalDogs({ commit }) {
    commit("setIsLoadingDogs", true);
    try {
      const data = await dog.fetchAdditionalDogs();
      const additionalDogs = data.message;
      commit("setAdditionalDogs", additionalDogs);
      commit("setIsLoadingDogs", false);
    } catch (error) {
      commit("setIsLoadingDogs", false);
      console.log({ error });
    }
  },
  async searchDogsByBreed({ commit }, query) {
    commit("setIsLoadingDogs", true);
    try {
      const data = await dog._searchBreed(query);
      const searchedBreed = data.message;
      commit("setSearchedBreed", searchedBreed);
      commit("setIsLoadingDogs", false);
    } catch (error) {
      console.log({ error });
      commit("setIsLoadingDogs", false);
    }
  },
  clearSearchedBreed({ commit }) {
    commit("setClearSearchedBreed");
  },
};

// mutations
const mutations = {
  setDogs(state, dogs) {
    state.dogs = dogs;
  },
  setAdditionalDogs(state, additionalDogs) {
    state.dogs = state.dogs.concat(additionalDogs);
  },
  setIsLoadingDogs(state, value) {
    state.isLoadingDogs = value;
  },
  setSearchedBreed(state, value) {
    state.searchedBreeds = value;
  },
  setClearSearchedBreed(state) {
    state.searchedBreeds = [];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
