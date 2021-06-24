<template>
  <div class="home my-5">
    <h1 class="subheading grey--text ml-6">Home</h1>
    <v-container class="my-5">
      <v-card flat class="silver lighten-5 pa-3" v-for="stuff in stuffs" :key="stuff.title">
        <v-layout row wrap class="pa-3 stuffs">
          <v-flex xs12 md6>
            <div class="caption grey--text">Title</div>
            <div>{{stuff.title}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Author</div>
            <div>{{stuff.author}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Date</div>
            <div>{{stuff.date}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div>
              <v-chip small :color="`${stuff.masterpiece === true ? 'blue' : 'pink'}`">
                {{stuff.masterpiece === true ? '걸작' : '구림'}}
              </v-chip>
            </div>
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
        { title: 'My First Vue Project with Vuetify', author: 'Shin Leejong', date: '2021-06-24', masterpiece: true},
        { title: 'Vuetify is so awesome', author: 'Shin Leejong', date: '2021-06-23', masterpiece: true},
        { title: '한글로도 뭔가 적어야지', author: '신이종', date: '2021-06-24', masterpiece: false},
        { title: '미래에서 온 소년', author: '신이종', date: '2022-06-24', masterpiece: true},
        { title: 'A Cowboy From The Past', author: 'Lee Yein', date: '2020-02-02', masterpiece: true},
        { title: '다음의 결산정리 사항에 대하여', author: '이니뚜', date: '2020-03-04', masterpiece: true},
        { title: '에베벨베레벨베렙ㄼㄹ', author: '이예인', date: '2020-04-03', masterpiece: false},
        { title: 'A stock for the purpose of long-term investment', author: 'Lee Niddo', date: '1997-03-29', masterpiece: false},
      ]
    }
  },
  components: {},
});
</script>
