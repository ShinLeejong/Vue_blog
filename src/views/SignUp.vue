<template>
  <div>
    <v-dialog max-width="20rem" v-model="team.dialog">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" class="error">회원가입</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
            <h2 class="text-subtitle-4 text-center">회원정보 등록</h2>  
        </v-card-title>
        <v-card-text>
          <v-form class="pa-2" ref="form">
            <v-text-field
              label="이름"
              v-model="team.name"
              prepend-icon="mdi-id-card"
            ></v-text-field>
            <v-text-field
              label="별명"
              v-model="team.nickname"
              prepend-icon="mdi-format-title"
            ></v-text-field>
            <v-text-field
              label="내 역할"
              v-model="team.role"
              prepend-icon="mdi-key-chain-variant"
            ></v-text-field>
            <v-radio-group
              label="성별"
              v-model="team.sex"
              prepend-icon="mdi-gender-male-female"
              row
            >
                <v-radio
                label="남성"
                value="Male">
                </v-radio>
                <v-radio
                label="여성"
                value="Female">
                </v-radio>
            </v-radio-group>
            <v-menu max-width="290">
                <template v-slot:activator="{ on }">
                    <v-text-field :value="team.birth" label="생일" prepend-icon="mdi-calendar-range" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="team.birth"></v-date-picker>
            </v-menu>
            <v-text-field
              label="이메일"
              v-model="team.email"
              prepend-icon="mdi-email"
            ></v-text-field>
            <v-text-field
              label="취미"
              v-model="team.hobby"
              prepend-icon="mdi-play"
            ></v-text-field>
            <v-btn text class="success" @click="submit" :loading="loading"
              >등록</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { db } from "../firebase.js";
// 나이 will be auto-generated in logic part
export default {
  /* eslint-disable */
  data() {
    return {
      team: {
        birth: '',
        email: '',
        hobby: '',
        name: '',
        nickname: '',
        role: '',
        sex: '',
      },
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
};
</script>
<style></style>
