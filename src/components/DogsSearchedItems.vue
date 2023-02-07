<template>
  <div class="dogs__cards search">
    <figure class="dog--image" v-for="(dog, index) in dogs" :key="`${dog}-${index}`">
      <router-link :to="{ name: 'dogDetails', params: { id: `dogId-${index}` } }">
        <img :src="dog" alt="Dog" loading="lazy" />
      </router-link>
    </figure>
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
