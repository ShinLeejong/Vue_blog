<template>
  <div class="notices my-5">
    <h1 class="subheading grey--text ml-6">Notice</h1>

    <v-container class="my-5">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="notice in notices"
          :key="notice.id.stringValue"
        >
          <v-expansion-panel-header>
            <v-card-text class="pa-6">
              {{ notice.title.stringValue }}
            </v-card-text>
            <v-card-text class="d-flex justify-end"> 저자: 이종뚜 </v-card-text>
          </v-expansion-panel-header>
          <v-divider></v-divider>
          <v-expansion-panel-content>
            <v-card flat>
              <v-card-text class="pa-4 pt-12 pl-8">
                <div>
                  <p>
                    {{ notice.content.stringValue }}
                  </p>
                </div>
              </v-card-text>
            </v-card>
            <v-divider class="mb-4 grey"></v-divider>
            <v-card flat>
              <v-card-text class="px-4 py-0 grey--text">
                <div class="font-weight-bold">
                  공지일:
                  {{
                    `${notice.date_year.integerValue}년 ${notice.date_month.integerValue}월 ${notice.date_day.integerValue}일`
                  }}
                </div>
                <div>이종뚜, Shin Leejong</div>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-container>
        <v-row v-for="(page, idx) in total_page" :key="page" class="mt-2">
          <v-btn class="ma-2" @click="page = idx + 1">{{idx + 1}}</v-btn>      
        </v-row>
      </v-container>
      <PostNotice />
      <!-- todo -->
    </v-container>
  </div>
</template>

<script>
import PostNotice from "./PostNotice.vue";
import { db } from "../firebase.js";

export default {
  data() {
    return {
      page: 1,
      total_page: 0,
      notices: [],
    };
  },
  components: {
    PostNotice,
  },
  computed: {
    mynotices() {
      return this.notices.filter(
        (notice) => notice.author === "신이종" || "Shin Leejong"
      );
    },
    show() {
      return this.$store.state.status.name.stringValue === "신이종";
    },
  },
  created() {
    const noticeRef = db.collection("Notice");
    noticeRef.get().then(async (snap) => {
      this.total_page = Math.floor(snap.size / 6 + 1);
      const getNotices = await noticeRef.where("id", "<=", this.page * 6).get();
      getNotices._delegate.docs.forEach((ele) => {
        this.notices.push({
          ...ele._document.data.value.mapValue.fields,
        });
      });
    });
  },
};
</script>
