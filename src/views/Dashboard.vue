<template>
  <v-container :class="[isMobile ? '' : 'ma-10', 'grey lighten-5']">
    <v-row no-gutters :class="[isMobile ? 'justify-center' : '']">
      <Lee />
      <v-col :class="[isMobile ? 'my-4' : 'mx-12 my-12']">
        <v-card :class="[isMobile ? 'mx-auto mb-8' : 'mb-8']" min-width="320">
          <v-card-title class="mx-2 mb-2">Crew Members</v-card-title>
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
                      <img :src="team.avatar" :alt="team.name + '\'s avatar'" />
                    </v-list-item-avatar>
                  </v-list-item>
                </v-card>
              </template>
            </div>
            <div justify="right">
              <v-list-item router :to="link.route">
                <v-icon>
                  {{ link.icon }}
                </v-icon>
                <span class="ml-2">{{ link.text }}</span>
              </v-list-item>
            </div>
          </div>
        </v-card>
        <v-card :class="[isMobile ? 'mx-auto mb-8' : 'mb-8']" min-width="320">
          <v-card-title class="mx-2 mb-2"> Notice </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <div class="v-list-item-group">
            <div
              v-for="notice in notices"
              :key="notice.id.integerValue"
              role="listitem"
              class="v-list-item"
            >
              <v-btn rounded block class="pa-1">
                <v-row>
                  <v-card
                    border="right"
                    :class="[
                      'pa-2 col-md-2',
                      isMobile ? 'none' : 'd-flex align-center',
                    ]"
                  >
                    <v-chip
                      small
                      color="purple"
                      v-if="!isMobile"
                    >
                      대장
                    </v-chip>
                  </v-card>
                  <v-card
                    :class="[
                      'pa-2 d-flex align-center',
                      isMobile ? 'col-md-8' : 'col-md-7',
                    ]"
                  >
                    {{
                      notice.title.stringValue.length > 16
                        ? notice.title.stringValue.slice(0, 16) + "..."
                        : notice.title.stringValue
                    }}
                  </v-card>
                  <v-card
                    :class="[
                      'pa-2 col-md-3',
                      isMobile ? 'none' : 'd-flex align-center',
                    ]"
                  >
                    {{ `${notice.date_year.integerValue}.${notice.date_month.integerValue}.${notice.date_day.integerValue}` }}
                  </v-card>
                </v-row>
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col class="my-12">
        <v-card :class="[isMobile ? 'mx-auto mb-8' : 'mb-8']" min-width="320">
          <v-card-title class="mx-2 mb-2">Recent Board Posts</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <div class="v-list-item-group">
            <div
              v-for="board in boards"
              :key="board.title.stringValue"
              role="listitem"
              class="v-list-item d-flex align-center"
            >
              <v-btn rounded block class="pa-1">
                <v-row>
                  <v-card
                    border="right"
                    :class="[
                      'pa-2 col-md-3',
                      isMobile ? 'none' : 'd-flex align-center',
                    ]"
                  >
                    <v-chip
                      small
                      color="purple"
                      v-if="board.author.stringValue === '이종뚜' && !isMobile"
                    >
                      대장
                    </v-chip>
                    &nbsp;{{ board.author.stringValue }}
                  </v-card>
                  <v-card
                    :class="[
                      'pa-2 col-md-6 d-flex align-center',
                      isMobile ? 'col-md-7' : 'col-md-6',
                    ]"
                  >
                    {{
                      board.title.stringValue.length > 16
                        ? board.title.stringValue.slice(0, 16) + "..."
                        : board.title.stringValue
                    }}
                  </v-card>
                  <v-card
                    :class="[
                      'pa-2 col-md-3',
                      isMobile ? 'none' : 'd-flex align-center',
                    ]"
                  >
                    {{
                      board.date_year.integerValue +
                      "년 " +
                      board.date_month.integerValue +
                      "월 " +
                      board.date_day.integerValue +
                      "일"
                    }}
                  </v-card>
                </v-row>
              </v-btn>
            </div>
          </div>
        </v-card>
        <v-card :class="[isMobile ? 'mx-auto mb-8' : 'mb-8']" min-width="320">
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
        text: "See the whole team members...",
        route: "/team",
      },
      init: false,
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
        case "xs":
          return true;
        case "sm":
          return true;
        case "md":
          return false;
        case "lg":
          return false;
        case "xl":
          return false;
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
    const noticeRef = db.collection("Notice");
    const getNotices = noticeRef.orderBy("id").limit(4).get();
    getNotices
      .then((res) => {
        res.docs.forEach((ele) => {
          const {
            _delegate: {
              _document: {
                data: {
                  value: {
                    mapValue: { fields },
                  },
                },
              },
            },
          } = ele;
          this.notices.push(fields);
        });
      })
      .catch((err) => console.error(err));

    // Board
    const boardRef = db.collection("Board");
    const getBoards = boardRef.orderBy("date").limit(6).get();
    getBoards
      .then((res) => {
        res.docs.forEach((ele) => {
          const {
            _delegate: {
              _document: {
                data: {
                  value: {
                    mapValue: { fields },
                  },
                },
              },
            },
          } = ele;
          this.boards.push(fields);
        });
      })
      .catch((err) => console.error(err));
  },
};
</script>
<style>
.none {
  display: none;
}
</style>
