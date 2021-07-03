<template>
  <v-card :loading="loading" :class="[isMobile ? '' : 'my-12']" max-width="320">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-responsive :aspect-ratio="4 / 3">
      <v-img height="240" :src="Lee_avatar"></v-img>
    </v-responsive>

    <v-card-title class="mx-2 mb-2">Lee, Shin Leejong</v-card-title>
    <v-card-text>
      <v-row align="center" class="mx-0 mb-2">
        <v-icon left>mdi-phone-in-talk</v-icon>
        <div class="grey--text">+82 10) 5314-4325</div>
      </v-row>
      <v-row align="center" class="mx-0 my-2">
        <v-icon left>mdi-location-enter</v-icon>
        <div class="grey--text">충청북도 제천시</div>
      </v-row>
      <v-row align="center" class="mx-0 my-2">
        <v-icon left>mdi-discord</v-icon>
        <div class="grey--text">신돼지#9788</div>
      </v-row>
      <v-row align="center" class="mx-0 my-2">
        <v-icon left>mdi-email</v-icon>
        <div class="grey--text">spinburgjexer@gmail.com</div>
      </v-row>
      <div class="mt-3 mx-2">Lee's Blog의 개발자입니다.</div>
      <div class="mx-2">부족한 점 하단을 통해 많은 쪽지 보내주세요.</div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-title class="mx-2">취미</v-card-title>
    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip color="primary">음악 감상, 노래 부르기</v-chip>
        <v-chip color="success">게임 하기</v-chip>
        <v-chip color="green">꿀잠 자기</v-chip>
        <v-chip color="info">맛집 탐방</v-chip>
        <v-chip color="error">SNS 하기</v-chip>
      </v-chip-group>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-row justify="center" class="mt-1 mb-1">
      <SendMessage />
    </v-row>
  </v-card>
</template>
<script>
import { storage } from "../firebase";
import SendMessage from "./SendMessage.vue";

export default {
  data: () => ({
    loading: false,
    selection: 0,
    Lee_avatar: "",
  }),

  components: {
    SendMessage,
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

  methods: {
    message() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
      /* some popup logic to message */
    },
  },

  mounted() {
    storage
      .ref(`Team/이종뚜/이종뚜.jpg`)
      .getDownloadURL()
      .then((url) => (this.Lee_avatar = url))
      .catch((err) => console.error(err));
  },
};
</script>
