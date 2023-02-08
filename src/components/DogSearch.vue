<template>
  <div class="input-container">
    <input name="searchBreed" id="searchBreed" @input="onChangeDebounced" placeholder="Search by dog's breed" />
  </div>
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
