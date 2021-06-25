<template>
  <div>

    <v-snackbar v-model="submitDone" :timeout="4000" top>
      <span>글이 추가되었습니다.</span>
      <v-btn text color="white" @click="snackbarBtnClicked" right>Close</v-btn>
    </v-snackbar>

    <v-app-bar app>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="onNavIconClicked"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="text-capitalize">
        <span class="font-weight-light">Welcome to</span>
        <span>Lee's Blog!</span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" color="grey">
            <v-icon left>mdi-chevron-down</v-icon>
            <span class="text-capitalize">Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-title>
              {{ link.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text>
        <span>Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="success">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100" class="center">
            <img :src="myAvatar" alt="" />
          </v-avatar>
          <p class="white--text subheading text-capitalize mt-6 text-center">
            Lee's Blog
          </p>
        </v-flex>
        <v-flex class="mt-4 mb-4">
          <Popup @stuffSubmitted="submitDone = true" />
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import myAvatar from "../assets/team_avatars/Lee.jpg";
import popup from "../views/Popup.vue";

export default {
  data() {
    return {
      drawer: false,
      submitDone: false,
      myAvatar,
      links: [
        {
          icon: "mdi-view-dashboard",
          text: "Dashboard",
          route: "/",
        },
        {
          icon: "mdi-folder-outline",
          text: "My Projects",
          route: "/project",
        },
        {
          icon: "mdi-microsoft-teams",
          text: "Team",
          route: "/team",
        },
      ],
    };
  },
  components: {
    Popup: popup,
  },
  methods: {
    onNavIconClicked: function () {
      this.drawer = !this.drawer;
    },
    snackbarBtnClicked: function () {
      this.submitDone = false;
    }
  },
};
</script>
<style scoped>
span {
  margin: 0 0.25rem;
}
</style>
