<!-- infinite scrolling -->

<template>
  <div class="home my-5">
    <h1 class="subheading grey--text ml-6">Board</h1>
    <v-container class="my-5">
      <v-layout row>
        <v-flex xs6 md2 class="offset-md-8">
          <v-select
            :items="teams"
            v-model="team"
          ></v-select>
        </v-flex>
        <v-flex xs6 md1 class="d-flex ml-6 mb-4 align-center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="pink" v-on:click="sort(team)" v-on="on">
                <v-icon>mdi-folder</v-icon>
              </v-btn>
            </template>
            <span class="caption">게시판 골라보기</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
      <v-flex class="mt-4 mb-4">
        <Popup @boardsSubmitted="submitDone = true" />
      </v-flex>
      <v-card
        flat
        class="silver lighten-5 pa-3"
        v-for="board in boards"
        :key="board.id"
      >
        <v-layout row wrap class="pa-3 boards">
          <v-flex xs12 md6>
            <div class="caption grey--text">Title</div>
            <div>{{ board.title }}</div>
          </v-flex>
          <v-flex xs6 sm6 md3>
            <div class="caption grey--text">Author</div>
            <div>{{ board.author }}</div>
          </v-flex>
          <v-flex xs6 sm6 md3>
            <div class="caption grey--text">Date</div>
            <div>{{ board.date }}</div>
          </v-flex>
        </v-layout>
      </v-card>
      <v-spacer></v-spacer>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import { db } from "../firebase.js";
import popup from "./Popup.vue";

export default Vue.extend({
  data() {
    return {
      boards: [],
      submitDone: false,
      teams: [],
      team: '',
    };
  },
  components: {
    Popup: popup,
  },
  methods: {
    sort: function (selection) {
      return this.boards.filter(ele => ele.author === selection);
    }
  },
  created() {
    db.collection("boards").onSnapshot((res) => {
      const changes = res.docChanges();
      changes.forEach((item) => {
        if (item.type === "added") {
          this.boards.push({
            id: item.doc.id,
            ...item.doc.data(),
          });
        }
      });
    });

    db.collection("Team").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(item => {
        this.teams.push(item.doc.data().nickname)
      })
    })
  },
});
</script>
