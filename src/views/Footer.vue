<template>
  <v-footer dark padless fluid>
    <v-card
      flat
      tile
      :class="['lighten-1 white--text text-center footer-card', randomColor]"
    >
      <v-card-text>
        <v-btn
          v-for="btn in btns"
          :key="btn.icon"
          class="mx-4 white--text"
          icon
          :href="btn.link"
        >
          <v-icon size="24px">
            {{ btn.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Lee's Blog - Made by Shin Leejong, with Vuetify.<br />
        내가 쓰고 싶어서 만드는 중인 블로그<br />
        6월 23일에 Vuetify 공부 시작, 현재까지 꾸준히 기능 보강 중<br />
        블로그 Github 주소:
        <a href="https://github.com/iiy4383/Vue_blog"
          >https://github.com/iiy4383/Vue_blog</a
        >
      </v-card-text>
      <v-divider></v-divider>

      <v-card-text class="white--text">
        <div>Last Updated: July 4, 2021</div>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import randomColor from "../components/randomColor.ts";

export default {
  data: () => ({
    randomColor: randomColor(),
    btns: [
      {
        icon: "mdi-home",
        link: "/",
      },
      {
        icon: "mdi-facebook",
        link: "https://facebook.com/profile.php?id=100032943661331",
      },
      {
        icon: "mdi-github",
        link: "https://github.com/iiy4383",
      },
      {
        icon: "mdi-instagram",
        link: "https://www.instagram.com/___9510251/",
      },
    ],
  }),
};
</script>

<style scoped>
.footer-card {
  width: 100%;
}

a:link,
a:visited,
a:active {
  text-decoration: none;
  color: inherit;
}

a:hover {
  opacity: 0.7;
}
</style>
