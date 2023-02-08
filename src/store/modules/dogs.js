import dog from "../../helper/api/dog";

const state = () => ({
  isLoadingDogs: false,
  dogs: [],
  dogDetails: {},
  searchedBreeds: [],
  searchStatus: false,
  dogBreedQuery: "",
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
  async getDogDetails({ commit }) {
    try {
      const data = await dog.fetchDogdetails();
      console.log({ data });
    } catch (error) {
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
    commit("setSearchStatus", true);
    commit("setDogBreedQuery", query);

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
  async searchDogsByBreedAdditionalTwenty({ commit }, query) {
    commit("setSearchStatus", true);
    console.log({ query });
    try {
      const data = await dog._searchBreed(query);
      console.log({ data });
      const searchedBreed = data.message;
      commit("setSearchedBreedAdditionalTwenty", searchedBreed);
    } catch (error) {
      console.log({ error });
      commit("setIsLoadingDogs", false);
    }
  },
  clearSearchedBreed({ commit }) {
    commit("setClearSearchedBreed");
  },
  searchStatusAction({ commit }) {
    commit("setSearchStatus", false);
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
  setSearchedBreedAdditionalTwenty(state, value) {
    state.searchedBreeds = state.searchedBreeds.concat(value);
  },
  setClearSearchedBreed(state) {
    state.searchedBreeds = [];
    state.dogBreedQuery = "";
  },
  setSearchStatus(state, value) {
    state.searchStatus = value;
  },
  setDogBreedQuery(state, breed) {
    state.dogBreedQuery = breed;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
