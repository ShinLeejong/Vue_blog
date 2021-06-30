<template>
  <v-container class="grey lighten-5 ma-10">
    <v-row no-gutters>
      <Lee />
      <!-- <template v-for="n in 4">
        <v-col :key="n">
          <v-card class="pa-8" outlined tile> Column </v-card>
        </v-col>
        <v-responsive
          v-if="n === 2"
          :key="`width-${n}`"
          width="100%"
        ></v-responsive>
      </template> -->
    </v-row>
  </v-container>
</template>
<script>
import Lee from "./Lee.vue"
export default {
  data() {
    return {
      
    }
  },
  components: {
    Lee
  }
};
</script>
<style></style>
