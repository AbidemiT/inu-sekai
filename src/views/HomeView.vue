<template>
  <main class="is__wrapper">
    <dog-search />
    <span class="loader" v-if="isLoadingDogs"></span>
    <dogs-searched-items :dogs="dogsByBreed" v-else-if="!isLoadingDogs && searchStatus" />
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
      fetchedDogsFirstFifty: false,
    };
  },
  computed: {
    ...mapState({
      dogs: (state) => state.dogs.dogs,
      searchStatus: (state) => state.dogs.searchStatus,
      dogsByBreed: (state) => state.dogs.searchedBreeds,
      dogBreed: (state) => state.dogs.dogBreedQuery,
      isLoadingDogs: (state) => state.dogs.isLoadingDogs,
    }),
  },

  created() {
    window.addEventListener("scroll", this.handleScroll);
    if (this.dogs && this.dogs.length < 50) {
      this.$store.dispatch("getAllDogs");
      this.fetchedDogsFirstFifty = true;

      if (this.fetchedDogsFirstFifty && this.dogs.length < 100) {
        this.$store.dispatch("fecthAdditionalDogs");
      }
    } else {
      this.fetchedDogsFirstFifty = false;
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow =
        Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        if (this.dogBreed) {
          this.$store.dispatch(
            "searchDogsByBreedAdditionalTwenty",
            this.dogBreed
          );
        }
      }
    },
  },
});
</script>
