<template>
  <div>
    <v-snackbar v-model="submitDone" :timeout="4000" top>
      <span>글이 추가되었습니다.</span>
      <v-btn text color="white" @click="snackbarBtnClicked" right>Close</v-btn>
    </v-snackbar>

    <v-app-bar app :color="randomColor" dark>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="onNavIconClicked"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="text-capitalize app-bar-title-navbar">
        <span class="font-weight-light">Welcome to</span>
        <span>Lee's Blog!</span>
      </v-app-bar-title>
      <v-spacer class="navbar_v-spacer"></v-spacer>
      <v-btn text class="weather-btn">
        <v-icon left>mdi-white-balance-sunny</v-icon>
        <span
          >{{ geoInfos.name || "" }}
          {{ geoInfos.main === undefined ? "" : geoInfos.main.temp }}
          &#8451;
        </span>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" class="navbar_v-menu_v-btn">
            <v-icon left>mdi-chevron-down</v-icon>
            <span class="text-capitalize">Menu</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="link in links"
            :id="link.text"
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
      <v-btn text right>
        <span>{{login.text}}</span>
        <v-icon right>{{login.icon}}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="success">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100" class="center">
            <img :src="status.avatar" alt="" />
          </v-avatar>
          <p class="white--text subheading text-capitalize mt-6 text-center">
            {{status.name}}
          </p>
        </v-flex>
      </v-layout>
      <v-flex :class="[isMobile ? 'ma-4' : 'none']">
        <v-icon left>mdi-weather-cloudy</v-icon>
        <span class="white--text">
          {{ geoInfos.name || "" }}
          {{ geoInfos.main === undefined ? "" : geoInfos.main.temp }}
          &#8451;
        </span>
      </v-flex>
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
import Guest from "../assets/team_avatars/Guest.jpg";
import { getGeoInfo } from "./weather.js";
// import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      drawer: false,
      submitDone: false,
      geolocation: "",
      weather: "",
      geoInfos: {},
      links: [
        {
          icon: "mdi-view-dashboard",
          text: "Dashboard",
          route: "/",
        },
        {
          icon: "mdi-bulletin-board",
          text: "Board",
          route: "/board",
        },
        {
          icon: "mdi-developer-board",
          text: "Notice",
          route: "/Notice",
        },
        {
          icon: "mdi-microsoft-teams",
          text: "Team",
          route: "/team",
        },
      ],
      login: {
        text: "Sign in",
        icon: "mdi-exit-to-app",
      },
      status: {
        avatar: Guest,
        name: "Guest"
      }
    };
  },
  components: {},
  methods: {
    onNavIconClicked: function () {
      this.drawer = !this.drawer;
    },
    snackbarBtnClicked: function () {
      this.submitDone = false;
    },
  },
  computed: {
    randomColor() {
      const random = Math.floor(Math.random() * 6);
      let color;
      switch (random) {
        case 5:
          color = "error";
          break;
        case 4:
          color = "indigo";
          break;
        case 3:
          color = "success";
          break;
        case 2:
          color = "primary";
          break;
        case 1:
          color = "info";
          break;
        case 0:
          color = "deeppurple";
          break;
        default:
          color = "dark";
      }
      return color;
    },
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
  beforeCreate() {
    getGeoInfo();
    setTimeout(() => {
      this.geoInfos = this.$store.state.geoData;
    }, 1000);
  },
};
</script>
<style scoped>
span {
  margin: 0 0.25rem;
}

.none {
  display: none;
}

@media (orientation: portrait) {
  .weather-btn,
  .app-bar-title-navbar,
  .navbar_v-menu_v-btn{
    display: none;
  }
}
</style>