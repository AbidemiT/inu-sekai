<template>
  <div class="dog-details">
    <router-link :to="{ name: 'homeView' }">Back Home</router-link>
    <p>{{ $route.params.id }} Details Page</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "dogsDetails",
  computed: {
    ...mapState({
      dogDetails: (state) => state.dogs.dogDetails,
    }),
  },
  beforeRouteLeave() {
    this.$store.dispatch("clearSearchedBreed");
    this.$store.dispatch("searchStatusAction");
  },
};
</script>

<style>
a {
  color: red;
}
</style>
