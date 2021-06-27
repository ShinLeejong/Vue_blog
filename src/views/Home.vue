<template>
  <div class="home my-5">
    <h1 class="subheading grey--text ml-6">Home</h1>
    <v-container class="my-5">
      <v-layout row>
        <v-flex xs6 md2 class="offset-md-8">
          <v-select
            :items="['title', 'author', 'date']"
            v-model="item"
            v-on:input="sort(`${item}`, true)"
          ></v-select>
        </v-flex>
        <v-flex xs6 md1 class="d-flex ml-6 mb-4 align-center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="pink" v-on:click="sort(`${item}`, false)" v-on="on">
                <v-icon>mdi-folder</v-icon>
                Reverse
              </v-btn>
            </template>
            <span class="caption">Sort Reverse</span>
          </v-tooltip>
        </v-flex>
      </v-layout>

      <v-card
        flat
        class="silver lighten-5 pa-3"
        v-for="stuff in stuffs"
        :key="stuff.id"
      >
        <v-layout row wrap class="pa-3 stuffs">
          <v-flex xs12 md6>
            <div class="caption grey--text">Title</div>
            <div>{{ stuff.title }}</div>
          </v-flex>
          <v-flex xs6 sm6 md3>
            <div class="caption grey--text">Author</div>
            <div>{{ stuff.author }}</div>
          </v-flex>
          <v-flex xs6 sm6 md3>
            <div class="caption grey--text">Date</div>
            <div>{{ stuff.date }}</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import { db } from "../firebase.js";

export default Vue.extend({
  data() {
    return {
      item: "title",
      stuffs: [],
    };
  },
  components: {},
  methods: {
    sort(selection, reversion) {
      if (reversion === true)
        this.stuffs.sort((a, b) => (a[selection] < b[selection] ? 1 : -1));
      else this.stuffs.sort((a, b) => (a[selection] < b[selection] ? -1 : 1));
    },
  },
  created() {
    db.collection("stuffs").onSnapshot((res) => {
      const changes = res.docChanges();
      changes.forEach((item) => {
        if (item.type === "added") {
          this.stuffs.push({
            id: item.doc.id,
            ...item.doc.data(),
          });
        }
      });
    });
  },
});
</script>
