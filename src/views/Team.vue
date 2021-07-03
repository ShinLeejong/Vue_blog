<template>
  <div class="team my-5">
    <h1 class="subheading grey--text ml-6">Team</h1>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="mate in teams" :key="mate.nickname">
          <v-card class="text-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="104" class="purple lighten-3 team-avatar" @click.stop="onAvatarClicked(mate.nickname)">
                <v-avatar size="100">
                  <img :src="mate.avatar" :alt="mate.name + '\'s avatar'" />
                </v-avatar>
              </v-avatar>
              <v-dialog
                v-model="dialog"
                max-width="240"
              >
                <v-card>
                  <v-card-title>
                    <v-avatar size="104" class="purple lighten-3 team-avatar">
                      <v-avatar size="100">
                        <img :src="selected.avatar" :alt="mate.name + '\'s avatar'" />
                      </v-avatar>
                    </v-avatar>
                    {{selected.name}}님의 정보
                  </v-card-title>
                  <v-card-text>
                    {{selected.name}}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialog = false">
                      확인
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ mate.name }}</div>
              <div class="black--text">{{ mate.nickname }}</div>
              <div class="grey--text">{{ mate.role }}</div>
              <div class="grey--text">{{ mate.age }}</div>
              <div class="grey--text">{{ mate.sex }}</div>
              <div class="grey--text">{{ mate.birth }}</div>
              <div class="grey--text">{{ mate.hobby }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="grey" class="justify-start">
                <v-icon small left>mdi-email</v-icon>
                <span class="text-lowercase">{{ mate.email }}</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-container>
        <v-row justify="center" class="mt-8 mb-4">
          <SignUp @stuffSubmitted="submitDone = true" />
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import SignUp from "./SignUp.vue";
import { db, storage } from "../firebase.js";

export default {
  // eslint-disable-next-line
  data() {
    return {
      teams: [],
      dialog: false,
      selected: {},
    };
  },
  components: {
    SignUp,
  },
  methods: {
    onAvatarClicked: function(nickname) {
      this.selected = {};
      this.dialog = true;
      const teamRef = db.collection("Team");
      teamRef.where('nickname', '==', nickname)
        .get()
        .then(ele => {
            const {
              _delegate: {
                _document: {
                  data: {
                    value: {
                      mapValue: { fields: member },
                    },
                  },
                },
              },  
            } = ele.docs[0];
            this.selected = {
              age: member.age.integerValue,
              birth: member.birth.stringValue,
              email: member.email.stringValue,
              hobby: member.hobby.stringValue,
              name: member.name.stringValue,
              nickname: member.nickname.stringValue,
              role: member.role.stringValue,
              sex: member.sex.stringValue,
            };
        })
    }
  },
  computed: {
  },
  created() {
    db.collection("Team").onSnapshot((res) => {
      const changes = res.docChanges();
      let avatar;
      changes.forEach((item) => {
        if (item.type === "added") {
          storage
            .ref(`Team/${item.doc.data().profilePicture}`)
            .getDownloadURL()
            .then((url) => {
              avatar = url;
              this.teams.push({
                ...item.doc.data(),
                avatar,
              });
            })
            .catch((err) => console.error(err));
        }
      });
    });
  },
};
</script>
<style>
  .team-avatar:hover {
    opacity: 0.8;
  }
</style>