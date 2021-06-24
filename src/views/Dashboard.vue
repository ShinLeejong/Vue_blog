<template>
  <div class="home">
    <h1 class="subheading grey--text">Home</h1>
    <v-container class="my-5">
      <v-card flat class="indigo lighten-5 pa-3">
        <v-layout row wrap v-for="stuff in stuffs" :key="stuff.title">
          <v-flex xs12 md6>
            <div class="caption grey--text">Title</div>
            <div>{{stuff.title}}</div>
          </v-flex>
          <v-flex xs6 sm6 md3>
            <div class="caption grey--text">Author</div>
            <div>{{stuff.author}}</div>
          </v-flex>
          <v-flex xs6 sm6 md3>
            <div class="caption grey--text">Date</div>
            <div>{{stuff.date}}</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      stuffs: [
        { title: 'My First Vue Project with Vuetify', author: 'Shin Leejong', date: '2021-06-24'},
        { title: 'Vuetify is so awesome', author: 'Shin Leejong', date: '2021-06-23'},
        { title: '한글로도 뭔가 적어야지', author: '신이종', date: '2021-06-24'},
        { title: '미래에서 온 소년', author: '신이종', date: '2022-06-24'},
        { title: 'A Cowboy From The Past', author: 'Lee Yein', date: '2020-02-02'},
        { title: '다음의 결산정리 사항에 대하여', author: '이니뚜', date: '2020-03-04'},
        { title: '에베벨베레벨베렙ㄼㄹ', author: '이예인', date: '2020-04-03'},
        { title: 'A stock for the purpose of long-term investment', author: 'Lee Niddo', date: '1997-03-29'},
      ]
    }
  },
  components: {},
});
</script>

<style scoped>
button {
  display: block;
  margin: 0.5rem auto;
}
</style>
