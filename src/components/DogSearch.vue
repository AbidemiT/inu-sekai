<template>
  <input name="searchBreed" id="searchBreed" @input="onChangeDebounced" />
</template>

<script>
import debounce from "../helper/debounce";
export default {
  name: "DogSearch",
  data() {
    return {
      searchInput: "",
    };
  },
  created() {
    this.onChangeDebounced = debounce((event) => {
      this.$store.dispatch("searchDogsByBreed", event.target.value);
    }, 2000);
  },
};
</script>

<style>

</style>
