<template full-width>
  <v-footer
    dark
    padless
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-center"
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
        Lee's Blog<br />
        Made by Shin Leejong, with Vuetify.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        <div>{{ new Date().getFullYear() }} — <strong>Lee's Blog</strong>, Shin Leejong</div>
        <div>Last Updated: July 4, 2021</div>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      btns: [
          {
            icon: 'mdi-home',
            link: '/'
          },
          {
            icon: 'mdi-facebook',
            link: "https://facebook.com/profile.php?id=100032943661331"
          },
          {
            icon: 'mdi-github',
            link: "https://github.com/iiy4383"
          },
          {
            icon: 'mdi-instagram',
            link: "https://www.instagram.com/___9510251/"
          }
      ],
    }),
  }
</script>