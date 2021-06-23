<template>
  <div class="home">
    <h1>home</h1>
    <v-btn color="indigo">이렇게 만들거나</v-btn>
    <v-btn depressed color="indigo">이렇게 해도 되고</v-btn>
    <v-btn flat class="indigo yellow--text">이렇게 해도 된다</v-btn>

    <v-btn depressed class="pink black--text">
      <v-icon left>mdi-email</v-icon>
      <span>메일</span>
    </v-btn>

    <v-btn depressed small class="red black--text">
      <v-icon left small>mdi-email</v-icon>
      <span>메일</span>
    </v-btn>
    
    <v-btn depressed large class="green black--text">
      <v-icon right large>mdi-email</v-icon>
      <span>메일</span>
    </v-btn>
    
    <v-btn fab depressed large class="blue black--text">
      <v-icon large>mdi-mouse</v-icon>
    </v-btn>

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
  margin: .5rem auto;
}  
</style>