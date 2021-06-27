<template>
  <div class="team my-5">
    <h1 class="subheading grey--text ml-6">Team</h1>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="mate in teams" :key="mate.name">
          <v-card class="text-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="104" class="purple lighten-3">
                <v-avatar size="100">
                  <img
                    :src="mate.avatar"
                    alt="his/her avatar or Wendy if their pic is null"
                  />
                </v-avatar>
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ mate.name }}</div>
              <div class="grey--text">{{ mate.role }}</div>
              <div class="grey--text">{{ mate.age }}</div>
              <div class="grey--text">{{ mate.sex }}</div>
              <div class="grey--text">{{ mate.birth }}</div>
              <div class="grey--text">{{ mate.hobby }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="grey">
                <v-icon small left>mdi-email</v-icon>
                <span class="text-lowercase">{{ mate.email }}</span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text color="grey">
                <v-icon small right>mdi-phone</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebase.js";
import { storage } from "../firebase.js";

export default {
  // eslint-disable-next-line
  data() {
    return {
      teams: [],
    };
  },
  created() {
    db.collection("Team").onSnapshot((res) => {
      const changes = res.docChanges();
      changes.forEach((item) => {
        if (item.type === "added") {
          this.teams.push({
            ...item.doc.data(),
            id: item.doc.data().nickname
          }
        )
      }});
    });      
    // const id = team.id;
    // const ref = storage.ref().child(`Team/${id}/${id}`);
  }
}
</script>