<template>
  <div>
    <v-dialog max-width="24rem" v-model="dialog" v-if="show">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" class="error">글쓰기</v-btn>
      </template>
      <v-card>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="ma-2">
              <p class="text-h5 text-center">글쓰기</p>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-card-text>
          <v-form class="pa-3" ref="form">
            <v-text-field
              label="글쓴이"
              v-model="author"
              prepend-icon="mdi-pencil-box-outline"
              readonly
            >
            </v-text-field>
            <v-text-field
              label="제목"
              v-model.lazy="title"
              prepend-icon="mdi-table-of-contents"
              :rules="rules"
            ></v-text-field>
            <v-textarea
              label="내용"
              v-model.lazy="content"
              prepend-icon="mdi-content-paste"
              :rules="rules"
            ></v-textarea>
            <v-row justify="center" class="mt-2">
              <v-btn text class="success" @click="submit" :loading="loading"
                >추가</v-btn
              >
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { db } from "../../firebase.js";

export default {
  /* eslint-disable */
  data() {
    return {
      title: "",
      content: "",
      rules: [(length) => length.length >= 3 || "3자 이상 입력해야 합니다."],
      loading: false,
      dialog: false,
    };
  },
  methods: {
    submit: function () {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const date = new Date();
        const post = {
          title: this.title,
          content: this.content,
          date_year: date.getFullYear(),
          date_month: date.getMonth() + 1,
          date_day: date.getDate(),
          date_hour: date.getHours(),
          date_minute: date.getMinutes(),
          author: this.author,
          date,
        };
        const boardRef = db.collection("Board");
        boardRef.get().then(snapshot => {
          post.id = snapshot.size + 1;
          boardRef.add(post).then(() => {
            this.loading = false;
            this.dialog = false;
            this.title = "";
            this.content = "";
            this.$emit("postSubmitted");
            alert("추가되었습니다!");
          })
        });
      } else {
        alert("게시물을 추가할 조건을 만족하지 않습니다.");
      }
    },
  },
  computed: {
    author() {
      return this.$store.state.status.nickname.stringValue;
    },
    show() {
      return this.$store.state.status.isLoggedIn;
    }
  },
};
</script>
<style></style>
