<template>
  <div class="notices my-5">
    <h1 class="subheading grey--text ml-6">Notice</h1>

    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="notice in notices.slice(0 + 6 * (page - 1), 6 + 6 * (page - 1))"
          :key="notice.title"
        >
          <v-expansion-panel-header>
            <v-card-text class="pa-6">
              {{ notice.title }}
            </v-card-text>
            <v-card-text class="d-flex justify-end">
              저자: {{ notice.author }}
            </v-card-text>
          </v-expansion-panel-header>
          <v-divider></v-divider>
          <v-expansion-panel-content>
            <v-card flat>
              <v-card-text class="pa-4 pt-12 pl-8">
                <div>
                  <p>
                    {{ notice.content }}
                  </p>
                </div>
              </v-card-text>
            </v-card>
            <v-divider class="mb-4 grey"></v-divider>
            <v-card flat>
              <v-card-text class="px-4 py-0 grey--text">
                <div class="font-weight-bold">공지일: {{ notice.date }}</div>
                <div>이종뚜, Shin Leejong</div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-container>
        <v-btn class="ma-2" @click="page = 1">1</v-btn>
        <v-btn class="ma-2" @click="page = 2">2</v-btn>
      </v-container>
      <PostNotice />
      <!-- todo -->
    </v-container>
  </div>
</template>

<script>
import PostNotice from './PostNotice.vue';

export default {
  data() {
    return {
      page: 1,
      notices: [
        {
          title: "My First Vue notice with Vuetify",
          author: "Shin Leejong",
          date: "2021-06-24",
          masterpiece: "걸작",
          content: "이거 생각보다 재밌네 ㅋㅋ",
        },
        {
          title: "Vuetify is so awesome",
          author: "Shin Leejong",
          date: "2021-06-23",
          masterpiece: "걸작",
          content: "Vuetify 진짜 좋다",
        },
        {
          title: "한글로도 뭔가 적어야지",
          author: "신이종",
          date: "2021-06-24",
          masterpiece: "쓰레기",
          content: "영어로만 적으면 섭섭해",
        },
        {
          title: "미래에서 온 소년",
          author: "신이종",
          date: "2022-06-24",
          masterpiece: "걸작",
          content: "2022년에는 차가 날아다녀요",
        },
        {
          title: "A Cowboy From The Past",
          author: "Lee Yein",
          date: "2020-02-02",
          masterpiece: "걸작",
          content: "Ddagudak-Ddagudak",
        },
        {
          title: "다음의 결산정리 사항에 대하여",
          author: "이니뚜",
          date: "2020-03-04",
          masterpiece: "걸작",
          content: "회계를 너무 좋아하는 예인이",
        },
        {
          title: "에베벨베레벨베렙ㄼㄹ",
          author: "이예인",
          date: "2020-04-03",
          masterpiece: "쓰레기",
          content: "아직도 옹알이를 하는 예인이",
        },
        {
          title: "A stock for the purpose of long-term investment",
          author: "Lee Niddo",
          date: "1997-03-29",
          masterpiece: "쓰레기",
          content: "Yein loves money",
        },
      ],
    };
  },
  components: {
    PostNotice
  },
  computed: {
    mynotices() {
      return this.notices.filter(
        (notice) => notice.author === "신이종" || "Shin Leejong"
      );
    },
    show() {
      return this.$store.state.status.name.stringValue === '신이종';
    }
  },
};
</script>
