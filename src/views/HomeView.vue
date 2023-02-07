<script>
export default {
  name: "homeView",
  data() {
    return {
      dogs: [],
      fetchedDogs: false,
      isLoading: false,
      searchInput: "",
      isDebounce: null,
    };
  },
  created() {
    this.isDebounce = this.debounce(this._searchBreed, 400);
    this.fetchDogs();

    if (this.dogs.length < 100) {
      this.fetchAdditional();
    }
  },
  methods: {
    async fetchDogs() {
      this.isLoading = true;

      try {
        const response = await fetch(
          "https://dog.ceo/api/breeds/image/random/50"
        );
        const data = await response.json();

        this.dogs = data.message;
        this.isLoading = false;
      } catch (error) {
        console.log({ error });
        this.isLoading = false;
      }
    },
    async fetchAdditional() {
      try {
        const response = await fetch(
          "https://dog.ceo/api/breeds/image/random/50"
        );
        const data = await response.json();

        this.dogs = this.dogs.concat(data.message);
      } catch (error) {
        console.log({ error });
      }
    },
    async _searchBreed() {
      const url = `https://dog.ceo/api/breed/${this.searchInput}/images/random`;
      console.log({ url });
      try {
        const response = await fetch(url);

        // console.log({ response });
        const data = await response.json();

        console.log({ data });
      } catch (error) {
        console.log({ error });
      }
    },
    debounce(functionName, time) {
      var timer;

      return function () {
        clearTimeout(timer);

        timer = setTimeout(() => {
          functionName.apply(this, arguments);
        }, time);
      };
    },
  },
};
</script>

<template>
  <main>
    <h1>Inu Sekai - Dogs World</h1>
    <input name="searchBreed" id="searchBreed" v-model="searchInput" @keyup="isDebounce" />
    <span class="loader" v-if="isLoading"></span>
    <div class="dogs__cards" v-else>
      <figure class="dog--image" v-for="(dog, index) in dogs" :key="`${dog}-${index}`">
        <router-link :to="{ name: 'dogDetails', params: { id: `dogId-${index}` } }">
          <img :src="dog" alt="Dog" loading="lazy" />
        </router-link>
      </figure>
    </div>
  </main>
</template>

<style lang="scss">
main {
  width: 100vw;
}

.dogs__cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5rem;

  .dog--image {
    width: 150px;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.loader {
  width: 64px;
  height: 64px;
  position: relative;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}

.loader:before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
  transform: rotate(45deg) translate(30%, 40%);
  background: #ff9371;
  box-shadow: 32px -34px 0 5px #ff3d00;
  animation: slide 2s infinite ease-in-out alternate;
}

.loader:after {
  content: "";
  position: absolute;
  left: 10px;
  top: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ff3d00;
  transform: rotate(0deg);
  transform-origin: 35px 145px;
  animation: rotate 2s infinite ease-in-out;
}

@keyframes slide {

  0%,
  100% {
    bottom: -35px;
  }

  25%,
  75% {
    bottom: -2px;
  }

  20%,
  80% {
    bottom: 2px;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(-15deg);
  }

  25%,
  75% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(25deg);
  }
}
</style>
