<template>
  <div>
    <v-dialog max-width="20rem" v-model="dialog" v-if="show">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" class="error">Add new stuff</v-btn>
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
            <v-btn text class="success" @click="submit" :loading="loading"
              >추가</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { db } from "../firebase.js";

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
        const stuff = {
          title: this.title,
          content: this.content,
        };
        db.collection("stuffs")
          .add(stuff)
          .then((data) => {
            console.log(data);
            this.loading = false;
            this.dialog = false;
            this.title = "";
            this.content = "";
            this.$emit("stuffSubmitted");
            alert("추가되었습니다!");
          });
      } else {
        alert("게시물을 추가할 조건을 만족하지 않습니다.");
      }
    },
  },
  computed: {
    show() {
      console.log(this.$store.state.status.isLoggedIn)
      return this.$store.state.status.isLoggedIn;
    }
  }
};
</script>
<style></style>
