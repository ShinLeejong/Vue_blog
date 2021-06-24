<template>
  <div class="home">
    <h1 class="subheading grey--text">Home</h1>
    <v-container class="my-5">
      <v-card flat class="indigo lighten-5 pa-3">
        <v-layout row wrap>
          <v-flex xs12 md6>
            <div class="caption grey--text">This is the dashboard</div>
            <div>How cool is it</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">This is the dashboard</div>
            <div>How cool is it</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">This is the dashboard</div>
            <div>How cool is it</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">This is the dashboard</div>
            <div>How cool is it</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
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
