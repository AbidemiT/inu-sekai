<template>
  <main>
    <h1>Inu Sekai - Dogs World</h1>
    <dog-search />
    <span class="loader" v-if="isLoadingDogs"></span>
    <dogs-searched-items :dogs="dogsByBreed" v-else-if="!isLoadingDogs && dogsByBreed.length !== 0" />
    <dogs-items :dogs="dogs" v-else />
  </main>
</template>

<script>
import { mapState } from "vuex";
import { defineComponent } from "vue";
import DogSearch from "../components/DogSearch.vue";
import DogsItems from "../components/DogsItems.vue";
import DogsSearchedItems from "../components/DogsSearchedItems.vue";

export default defineComponent({
  name: "homeView",
  components: {
    DogSearch,
    DogsItems,
    DogsSearchedItems,
  },
  data() {
    return {
      fetchedDogs: false,
    };
  },
  computed: mapState({
    dogs: (state) => state.dogs.dogs,
    dogsByBreed: (state) => state.dogs.searchedBreeds,
    isLoadingDogs: (state) => state.dogs.isLoadingDogs,
  }),
  created() {
    if (this.dogs.length < 50) {
      this.$store.dispatch("getAllDogs");
    }

    if (this.dogs.length > 49 && this.dogs.length < 100) {
      this.$store.dispatch("fecthAdditionalDogs");
    }
  },
});
</script>

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
