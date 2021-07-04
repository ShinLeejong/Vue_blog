<template>
  <div class="team my-5">
    <h1 class="subheading grey--text ml-6">Team</h1>

    <v-container class="my-5">
      <TeamList />
      <v-container>
        <v-row justify="center" class="mt-8 mb-4">
          <SignUp @stuffSubmitted="submitDone = true" />
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import SignUp from "./TeamSignUp.vue";
import TeamList from "./TeamList.vue";

export default {
  // eslint-disable-next-line
  data() {
    return {
      teams: [],
    };
  },
  components: {
    SignUp,
    TeamList,
  },
};
</script>
<style>