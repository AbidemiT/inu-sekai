const url = "https://dog.ceo/api/breeds/image/random/50";

export default {
  async fetchDogs() {
    const response = await fetch(url);
    return await response.json();
  },
  async fetchDogdetails(breed, id) {
    const url = `https://dog.ceo/api/breed/${breed}/${id}`;
    const response = await fetch(url);
    return await response.json();
  },
  async fetchAdditionalDogs() {
    const response = await fetch(url);
    return await response.json();
  },
  async _searchBreed(query) {
    if (!query) return;

    const url = `https://dog.ceo/api/breed/${query}/images/random/20`;

    const response = await fetch(url);

    return await response.json();
  },
};
