<template>
  <v-app>
    <v-main class="indigo lighten-5">
      <Navbar />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "./components/Navbar.vue";

export default Vue.extend({
  name: "App",
  components: {
    Navbar,
  },
  data: () => ({
    //
  }),
});
</script>

<style>
body {
  background-color: #eaeaea;
}
</style>
