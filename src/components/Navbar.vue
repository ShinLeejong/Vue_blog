<template>
  <div>
    <v-snackbar v-model="submitDone" :timeout="4000" top>
      <span>글이 추가되었습니다.</span>
      <v-btn text color="white" @click="snackbarBtnClicked" right>Close</v-btn>
    </v-snackbar>

    <v-app-bar app :color="randomColor()" dark>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="onNavIconClicked"
        aria-selected="true"
        aria-labelledby="v-app-bar-nav-icon"
        role="opens nav bar"
      >
      </v-app-bar-nav-icon>
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
      <Login />
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" :class="randomColor()">
      <v-layout column align-center>
        <v-flex class="mt-12">
          <v-avatar size="100" class="center">
            <img :src="status.avatar" alt="" />
          </v-avatar>
          <p class="white--text subheading text-capitalize mt-6 text-center">
            {{ status.name.stringValue }}
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
      <v-list class="mt-4">
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
      <v-list v-if="$store.state.status.isLoggedIn">
        <v-list-item class="v-list-item-setting" @click="onSettingClicked">
          <v-list-item-action>
            <v-icon class="white--text"> mdi-image-filter-tilt-shift </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">
              My Settings
            </v-list-item-title>
          </v-list-item-content>
          <!-- Dialog of Setting -->
          <v-dialog v-model="settingDialog" max-width="600">
            <v-card
              :loading="settingLoading"
              max-width="600"
              class="pt-4 px-4 pb-8"
            >
              <v-list-item>
                <v-list-item-title class="text-center">
                  설정
                </v-list-item-title>
              </v-list-item>
              <v-flex class="offset-md-8">
                <v-select
                  :items="settingSelectbar"
                  v-model="selection"
                ></v-select>
              </v-flex>
              <v-divider class="my-1"></v-divider>
              <!-- 설정 -->
              <!-- 개인 설정 -->
              <v-list-item v-if="selection === '개인 설정'">
                <v-list-item-content class="">
                  <v-list-item-subtitle>
                    <p class="subheading ml-4">로그인 관리</p>
                  </v-list-item-subtitle>
                  <v-col>
                    <v-checkbox
                      v-model="setting.personal.storeID"
                      :label="'아이디 저장'"
                      class="ma-0 ml-4"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="setting.personal.storePW"
                      :label="'비밀번호 저장'"
                      class="ma-0 ml-4"
                    ></v-checkbox>
                  </v-col>
                </v-list-item-content>
              </v-list-item>
              <!-- 개인 설정 -->
              <!-- 계정 설정 -->
              <v-list-item class="my-2 mb-8" v-if="selection === '계정 설정'">
                <v-list-item-title class="text-center mb-6">
                  계정 설정
                </v-list-item-title>
              </v-list-item>
              <!-- 계정 설정 -->
              <!-- UI -->
              <v-list-item class="my-2 mb-8" v-if="selection === 'UI'">
                <v-list-item-title class="text-center mb-6">
                  UI
                </v-list-item-title>
              </v-list-item>
              <!-- UI -->
              <!-- 설정 -->
              <v-row justify="center">
                <v-btn class="primary" @click="onSaveBtnClicked"> 저장 </v-btn>
              </v-row>
            </v-card>
          </v-dialog>
          <!-- Dialog of Setting -->
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { getGeoInfo } from "./weather.ts";
import Login from "./../views/Login.vue";
import randomColor from "./randomColor.ts";
import isMobile from "./isMobile.ts";

export default {
  data() {
    return {
      drawer: false,
      submitDone: false,
      geolocation: "",
      weather: "",
      randomColor,
      isMobile: isMobile(),
      geoInfos: {},
      selection: "개인 설정",
      settingSelectbar: ["개인 설정", "계정 설정", "UI"],
      setting: {
        personal: {
          storeID: false,
          storePW: false,
        },
        account: {},
        UI: {},
      },
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
      settingDialog: false,
      settingLoading: false,
    };
  },
  components: {
    Login,
  },
  methods: {
    onNavIconClicked: function () {
      this.drawer = !this.drawer;
    },
    snackbarBtnClicked: function () {
      this.submitDone = false;
    },
    onSettingClicked: function () {
      this.settingDialog = true;
      this.setting.personal.storeID = localStorage.getItem("storedID")
        ? true
        : false;
      this.setting.personal.storePW = localStorage.getItem("storedPW")
        ? true
        : false;
    },
    onSaveBtnClicked() {
      /* logic start */
      /* personal start */
      /* storedID start */
      if (this.setting.personal.storeID === true) {
        localStorage.setItem(
          "storedID",
          this.$store.state.status.nickname.stringValue
        );
      } else {
        localStorage.setItem("storedID", "");
      }
      /* storedID end */
      /* storedPW start */
      if (this.setting.personal.storePW === true) {
        localStorage.setItem(
          "storedPW",
          this.$store.state.status.password.stringValue
        );
      } else {
        localStorage.setItem("storedPW", "");
      }
      /* storedPW end */
      /* personal end */
      /* account start */

      /* account end */
      /* UI start */

      /* UI end */
      /* logic end */
      this.settingDialog = false;
      this.settingLoading = false;
    },
  },
  computed: {
    status() {
      return this.$store.state.status;
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
  .navbar_v-menu_v-btn {
    display: none;
  }
}

.v-list-item-setting:hover {
  opacity: 0.9;
}
</style>
