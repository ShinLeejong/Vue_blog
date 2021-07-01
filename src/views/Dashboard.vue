<template>
  <v-container :class="[isMobile ? '' : 'ma-10', 'grey lighten-5']">
    <v-row no-gutters :class="[isMobile ? 'justify-center': '']">
      <Lee />
      <v-col :class="[ isMobile ? 'my-4' : 'mx-12 my-12']">
        <v-card :class="[ isMobile ? 'mx-auto mb-8' : 'mb-8']" min-width="320">
          <v-card-title class="mx-2 mb-2"> Teams </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <div class="v-list-item-group" role="listbox">
            <div
              v-for="team in teams.slice(0, 2)"
              :key="team.nickname"
              role="listitem"
              class="v-list-item"
            >
              <template>
                <v-card class="ml-2 mt-4" max-width="440" outlined>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-subtitle class="">
                        {{ team.name }}, {{ team.age }}세,
                        {{ team.sex === "Male" ? "남" : "여" }}
                      </v-list-item-subtitle>
                      <v-list-item-title class="text-h5">
                        {{ team.nickname }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        <div id="team_role">{{ team.role }} 담당</div>
                        <div id="team_hobby">{{ team.hobby }}을(를) 좋아함</div>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-avatar size="120" color="grey">
                      <img :src="team.avatar" />
                    </v-list-item-avatar>
                  </v-list-item>
                </v-card>
              </template>
            </div>
            <div justify="right">
              <v-list-item
                router
                :to="link.route"
              >
                <v-icon>
                  {{link.icon}}
                </v-icon>
                <span class="ml-2">{{link.text}}</span>
              </v-list-item>              
            </div>
          </div>
        </v-card>
        <v-card :class="[ isMobile ? 'mx-auto mb-8' : 'mb-8']" min-width="320">
          <v-card-title class="mx-2 mb-2"> Board </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <div class="v-list-item-group">
            <div
              v-for="notice in notices"
              :key="notice.id"
              role="listitem"
              class="v-list-item"
            ></div>
          </div>
        </v-card>
      </v-col>
      <v-col class="mx-6 my-12">
        <v-card :class="[ isMobile ? 'mx-auto mb-8' : 'mb-8']" min-width="320">
          <v-card-title class="mx-2 mb-2"> Notice </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <div class="v-list-item-group">
            <div
              v-for="board in boards"
              :key="board.id"
              role="listitem"
              class="v-list-item"
            ></div>
          </div>
        </v-card>
        <v-card :class="[ isMobile ? 'mx-auto mb-8' : 'mb-8']" min-width="320">
          <v-card-title class="mx-2 mb-2">
            어떻게 쓸 지 고민중인 부분
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Lee from "./Lee.vue";
import { db, storage } from "../firebase.js";
export default {
  data() {
    return {
      teams: [],
      notices: [],
      boards: [],
      link: {
        icon: "mdi-link",
        text: "More",
        route: "/team"
      }
    };
  },
  components: {
    Lee,
  },
  methods: {
    Team_more_clicked() {
      /* console.log("hmm"); */
    },
  },
  computed: {
    isMobile() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return true
        case 'sm': return true
        case 'md': return false
        case 'lg': return false
        case 'xl': return false
        default:
        return false;
      }
    },
  },
  created() {
    // Teams
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

    // Notice

    // Board
  },

};
</script>
<style>

</style>
