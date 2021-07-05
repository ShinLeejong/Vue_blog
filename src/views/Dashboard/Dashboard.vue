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
              v-for="team in teams"
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
              :key="notice.id"
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
                    <v-chip small color="purple" v-if="!isMobile">
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
                      notice.title.length > 16
                        ? notice.title.slice(0, 16) + "..."
                        : notice.title
                    }}
                  </v-card>
                  <v-card
                    :class="[
                      'pa-2 col-md-3',
                      isMobile ? 'none' : 'd-flex align-center',
                    ]"
                  >
                    {{
                      `${notice.date_year}.${notice.date_month}.${notice.date_day}`
                    }}
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
              :key="board.title"
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
                      v-if="board.author === '이종뚜' && !isMobile"
                    >
                      대장
                    </v-chip>
                    &nbsp;{{ board.author }}
                  </v-card>
                  <v-card
                    :class="[
                      'pa-2 col-md-6 d-flex align-center',
                      isMobile ? 'col-md-7' : 'col-md-6',
                    ]"
                  >
                    {{
                      board.title.length > 16
                        ? board.title.slice(0, 16) + "..."
                        : board.title
                    }}
                  </v-card>
                  <v-card
                    :class="[
                      'pa-2 col-md-3',
                      isMobile ? 'none' : 'd-flex align-center',
                    ]"
                  >
                    {{
                      board.date_year +
                      "년 " +
                      board.date_month +
                      "월 " +
                      board.date_day +
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
import isMobile from "../../components/isMobile.ts";
import getFromFirebase from "../../components/getFromFirebase.ts";

export default {
  data() {
    return {
      teams: [],
      notices: [],
      boards: [],
      isMobile: isMobile(),
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
  computed: {},
  created: async function () {
    // Teams
    this.teams = await getFromFirebase("Team", true, 'date', 2, 'desc');

    // Notice
    this.notices = await getFromFirebase("Notice", false, 'id', 4);

    // Board
    this.boards = await getFromFirebase("Board", false, 'date', 6);
  },
};
</script>
<style>
.none {
  display: none;
}
</style>
