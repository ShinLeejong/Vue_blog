<template>
  <div class="team my-5">
    <h1 class="subheading grey--text ml-6">Team</h1>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="mate in team" :key="mate.name">
          <v-card class="text-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="105" class="pink">
                <v-avatar size="100">
                  <img :src="mate.avatar" alt=""/>
                </v-avatar>                
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ mate.name }}</div>
              <div class="grey--text">{{ mate.role }}</div>
              <div class="grey--text">{{ mate.age }}</div>
              <div class="grey--text">{{ mate.sex }}</div>
              <div class="grey--text">{{ mate.birth }}</div>
              <div class="grey--text">{{ mate.hobby }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="grey">
                <v-icon small left>mdi-email</v-icon>
                <span class="text-lowercase">{{ mate.email }}</span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text color="grey">
                <v-icon small right>mdi-phone</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Lee from '../assets/team_avatars/Lee.jpg';
import Yein from '../assets/team_avatars/Yiniddo.jpg';

export default {
  data() {
    return {
      team: [
        {
          name: "Shin Leejong",
          role: "Master",
          nickname: "Lee",
          age: 27,
          sex: "Male",
          birth: "Oct 25, 1995",
          hobby: "Singing",
          email: "spinburgjexer@gmail.com",
          avatar: Lee
        },
        {
          name: "Lee Yein",
          role: "Neutrality",
          nickname: "Guri",
          age: 25,
          sex: "Female",
          birth: "Mar 29, 1997",
          hobby: "Killing Lee",
          email: "dlduaqls@naver.com",
          avatar: Yein
        },
        {
          name: "Shin Youngjin",
          role: "Father of Lee",
          nickname: "King of Hwanggi",
          age: 52,
          sex: "Male",
          birth: "Sep 17, 1970",
          hobby: "Prunning Hwanggies",
          email: "gumjalove@for.ever",
          avatar: "null"
        },
        {
          name: "Yoo Geumja",
          role: "Mother of Lee",
          nickname: "Terrible singer",
          age: 47,
          sex: "Female",
          birth: "Dec 16, 1975",
          hobby: "Yelling in home",
          email: "Youngjinis@under.my.feet",
          avatar: "null"
        },
        {
          name: "Bae Yangsoon",
          role: "Conqueror",
          nickname: "Big mama",
          age: 87,
          sex: "Female. umm... perhaps.",
          birth: "Aug 28, 1935",
          hobby: "Being back-seat driver",
          email: "Jinji@japswa.yah",
          avatar: "null"
        },
      ],
    };
  },
};
</script>
