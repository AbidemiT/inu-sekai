const url = "https://dog.ceo/api/breeds/image/random/50";

export default {
  async fetchDogs() {
    const response = await fetch(url);
    return await response.json();
  },
  async fetchAdditionalDogs() {
    const response = await fetch(url);
    return await response.json();
  },
  async _searchBreed(query) {
    const url = `https://dog.ceo/api/breed/${query}/images/random/20`;
    const response = await fetch(url);

    return await response.json();
  },
};
