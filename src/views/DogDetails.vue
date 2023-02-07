<script>
export default {
  name: "dogsDetails",
  beforeRouteLeave() {
    this.$store.dispatch("clearSearchedBreed");
  },
};
</script>
<template>
  <div class="">
    <h1>{{ $route.params.id }} Details Page</h1>
  </div>
</template>

<style>

</style>
