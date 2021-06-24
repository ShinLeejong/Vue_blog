<template>
  <div>
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
      <v-btn text>
        <span> Sign Out </span>
        <v-icon right> mdi-exit-to-app </v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="success">
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
export default {
  data() {
    return {
      drawer: false,
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
  methods: {
    onNavIconClicked: function () {
      this.drawer = !this.drawer;
    },
  },
};
</script>
<style scoped>
span {
  margin: 0 0.25rem;
}
</style>
