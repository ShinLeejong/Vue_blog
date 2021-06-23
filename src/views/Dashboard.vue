<template>
  <div class="home">
    <h1>home</h1>
    <v-btn class="hidden-md-and-down">Hello?</v-btn>
    <v-btn class="hidden-md-and-up">Anybody Here?</v-btn>
    <v-btn class="hidden-md-only">Anybody There~!</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  components: {},
});
</script>

<style scoped>
button {
  display: block;
  margin: 0.5rem auto;
}
</style>
