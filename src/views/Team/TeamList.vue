<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md4 lg3 v-for="mate in teams" :key="mate.nickname">
      <v-card
        class="text-center ma-3 team-card"
        @click.stop="onCardClicked(mate.nickname)"
      >
        <v-responsive class="pt-4">
          <v-avatar size="104" class="purple lighten-3">
            <v-avatar size="100">
              <img :src="mate.avatar" :alt="mate.name + '\'s avatar'" />
            </v-avatar>
          </v-avatar>
          <v-dialog
            v-model="dialog"
            max-width="480"
            transition="dialog-top-transition"
          >
            <v-card :loading="loading" max-width="480" class="pt-4 px-4 pb-8">
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-responsive :aspect-ratio="3 / 2">
                <v-img height="320" :src="selected.avatar"></v-img>
              </v-responsive>

              <v-card-title class="mx-2 mb-2">{{
                selected.nickname
              }}</v-card-title>
              <v-card-subtitle class="mx-2 mb-2"
                >{{ selected.name }}, {{ selected.age }}세</v-card-subtitle
              >
              <v-card-text>
                <v-row align="center" class="mx-0 mb-2">
                  <v-icon left>mdi-gender-male-female</v-icon>
                  <div class="grey--text">
                    {{ selected.sex }}({{
                      selected.sex === "Male" ? "남성" : "여성"
                    }})
                  </div>
                </v-row>
                <v-row align="center" class="mx-0 mb-2" v-if="selected.address">
                  <v-icon left>mdi-location-enter</v-icon>
                  <div class="grey--text">{{ selected.address }}에 거주</div>
                </v-row>
                <v-row align="center" class="mx-0 my-2">
                  <v-icon left>mdi-cake-variant</v-icon>
                  <div class="grey--text">{{ selected.birth }}</div>
                </v-row>
                <v-row align="center" class="mx-0 my-2">
                  <v-icon left>mdi-email</v-icon>
                  <div class="grey--text">{{ selected.email }}</div>
                </v-row>
                <v-row align="center" class="mx-0 my-2">
                  <v-icon left>mdi-fire</v-icon>
                  <div class="grey--text">
                    팀 내에서 {{ selected.role }}을(를) 맡고 있음
                  </div>
                </v-row>
                <v-row align="center" class="mx-0 my-2">
                  <v-icon left>mdi-content-copy</v-icon>
                  <div class="grey--text">
                    {{
                      selected.introduce
                        ? selected.introduce
                        : "작성된 자기소개가 없습니다."
                    }}
                  </div>
                </v-row>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
              <v-card-title class="mx-2">취미</v-card-title>
              <v-card-text>
                <v-chip-group
                  v-model="selection"
                  active-class="deep-purple accent-4 white--text"
                  column
                >
                  <v-chip color="primary">{{ selected.hobby }}</v-chip>
                </v-chip-group>
              </v-card-text>
              <v-row justify="center">
                <v-btn color="info" text @click="closeDialog"> 나가기 </v-btn>
              </v-row>
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
          <v-row class="mx-2 mb-1">
            <v-icon small left>mdi-email</v-icon>
            <span class="text-lowercase grey--text">{{ mate.email }}</span>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { db, storage } from "../../firebase.js";

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      selection: 0,
      teams: [],
      selected: {
        avatar: "",
        nickname: "",
        name: "",
        age: "",
        sex: "",
        address: "",
        birth: "",
        email: "",
        role: "",
        introduce: "",
        hobby: "",
      },
    };
  },
  methods: {
    onCardClicked: function (nickname) {
      this.dialog = true;
      this.selected = {};
      const teamRef = db.collection("Team");
      teamRef
        .where("nickname", "==", nickname)
        .get()
        .then((ele) => {
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
          storage
            .ref(`Team/${member.profilePicture.stringValue}`)
            .getDownloadURL()
            .then((url) => {
              const avatar = url;
              this.selected = {
                age: member.age.integerValue, //
                birth: member.birth.stringValue,
                address: member.address?.stringValue, //
                email: member.email.stringValue, //
                hobby: member.hobby.stringValue, //
                name: member.name.stringValue, //
                nickname: member.nickname.stringValue, //
                role: member.role.stringValue, //
                sex: member.sex.stringValue, //
                introduce: member.introduce?.stringValue,
                avatar, //
              };
            })
            .catch((err) => console.log(err));
        });
    },
    closeDialog() {
      this.dialog = false;
    },
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

<style scoped>
.team-card:hover {
  opacity: 0.8;
}
</style>
