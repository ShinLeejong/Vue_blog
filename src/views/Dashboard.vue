<template>
  <div class="home my-5">
    <h1 class="subheading grey--text ml-6">Home</h1>
    <v-container class="my-5">

      <v-layout row>
          <v-flex xs6 md11>
            <v-select
              :items="['title', 'author', 'date', 'masterpiece']"
              v-model="item"
              v-on:input="sort(`${item}`, true)"
            ></v-select>    
          </v-flex>
          <v-flex xs6 md1>
            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-btn color="pink" v-on:click="sort(`${item}`, false)" v-on="on">
                  <v-icon>mdi-folder</v-icon>
                  Reverse
                </v-btn>                
              </template>
              <span class="caption">Sort Reverse</span>
            </v-tooltip>
          </v-flex>
      </v-layout>

      <v-card
        flat
        class="silver lighten-5 pa-3"
        v-for="stuff in stuffs"
        :key="stuff.title"
      >
        <v-layout row wrap class="pa-3 stuffs">
          <v-flex xs12 md6>
            <div class="caption grey--text">Title</div>
            <div>{{ stuff.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Author</div>
            <div>{{ stuff.author }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Date</div>
            <div>{{ stuff.date }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div>
              <v-chip
                small
                :color="`${stuff.masterpiece === '걸작' ? 'blue' : 'pink'}`"
              >
                {{ stuff.masterpiece }}
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

interface ObjType {
  item: string;
  stuffs: {
    [index: string]: string; // Index Signature
    title: string;
    author: string;
    date: string;
    masterpiece: string;
  }[];
}

export default Vue.extend({
  data(): ObjType {
    return {
      item: "title",
      stuffs: [
        {
          title: "My First Vue Project with Vuetify",
          author: "Shin Leejong",
          date: "2021-06-24",
          masterpiece: "걸작",
        },
        {
          title: "Vuetify is so awesome",
          author: "Shin Leejong",
          date: "2021-06-23",
          masterpiece: "걸작",
        },
        {
          title: "한글로도 뭔가 적어야지",
          author: "신이종",
          date: "2021-06-24",
          masterpiece: "쓰레기",
        },
        {
          title: "미래에서 온 소년",
          author: "신이종",
          date: "2022-06-24",
          masterpiece: "걸작",
        },
        {
          title: "A Cowboy From The Past",
          author: "Lee Yein",
          date: "2020-02-02",
          masterpiece: "걸작",
        },
        {
          title: "다음의 결산정리 사항에 대하여",
          author: "이니뚜",
          date: "2020-03-04",
          masterpiece: "걸작",
        },
        {
          title: "에베벨베레벨베렙ㄼㄹ",
          author: "이예인",
          date: "2020-04-03",
          masterpiece: "쓰레기",
        },
        {
          title: "A stock for the purpose of long-term investment",
          author: "Lee Niddo",
          date: "1997-03-29",
          masterpiece: "쓰레기",
        },
      ],
    };
  },
  components: {},
  methods: {
    sort(selection: string, reversion: boolean) {
      if (reversion === true)
        this.stuffs.sort((a, b) => (a[selection] < b[selection] ? 1 : -1));
      else this.stuffs.sort((a, b) => (a[selection] < b[selection] ? -1 : 1));
    },
  },
});
</script>
