<template>
  <div class="dogs__cards search" v-if="dogs.length !== 0">
    <figure class="dog--image" v-for="(dog, index) in dogs" :key="`${dog}-${index}`">
      <router-link :to="{ name: 'dogDetails', params: { id: `dogId-${index}` } }">
        <img :src="dog" alt="Dog" loading="lazy" />
      </router-link>
    </figure>
  </div>
  <div class="is-content" v-else>
    <p>Oops... No data for this breed</p>
  </div>
</template>

<script>
export default {
  name: "DogsSearchedItems",
  props: {
    dogs: {
      type: Object,
      required: true,
    },
  },
};
</script>
