<template>
  <v-dialog max-width="24rem" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn text right v-on="on" @click="clicked">
        <span>{{ login.text }}</span>
        <v-icon right>{{ login.icon }}</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="ma-2">
            <p class="text-h5 text-center">로그인</p>
          </v-list-item-title>
          <v-list-item-subtitle>
            <p class="subheading text-center">
              회원가입은 Team에서 할 수 있습니다.
            </p>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            label="별명"
            v-model.lazy="data.nickname"
            placeholder="별명"
            prepend-icon="mdi-id-card"
            required
          ></v-text-field>
          <v-text-field
            label="비밀번호"
            :type="'password'"
            v-model.lazy="data.password"
            placeholder="비밀번호"
            prepend-icon="mdi-form-textbox-password"
            required
          ></v-text-field>
          <v-row class="mx-6">
            <v-checkbox v-model="rememberID" :label="'아이디 저장'">
            </v-checkbox>
            <v-spacer></v-spacer>
            <v-checkbox v-model="rememberPW" :label="'비밀번호 저장'">
            </v-checkbox>
          </v-row>
          <v-row justify="center">
            <v-btn text class="success mb-4" @click="submit" :loading="loading">
              로그인
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { db } from "../firebase.js";
import getItem from "../components/localStorageGetter";
// 나이 will be auto-generated in logic part
export default {
  /* eslint-disable */
  data() {
    return {
      data: {
        nickname: '',
        password: '',
      },
      loading: false,
      dialog: false,
      login: {
        text: "Sign in",
        icon: "mdi-exit-to-app",
      },
      isLoggedIn: false,
      rememberID: false,
      rememberPW: false,
    };
  },
  methods: {
    submit: async function() {
      const stuff = {
        nickname: this.data.nickname,
        password: this.data.password,
        date: new Date(),
      };
      if (stuff.nickname === ''
            || stuff.password === '') {
                alert("입력되지 않은 내용이 있습니다.\n");
                return;
            }
      if (this.$refs.form.validate()) {
        this.loading = true;
        const ref = db.collection("Team");
        const getData = await ref.where('nickname', '==', stuff.nickname).get();
        if(getData.empty) {
            alert("입력하신 별명과 일치하는 계정이 존재하지 않습니다.");
            this.loading = false;
            return;
        }
        const doc = getData.docs[0];
        const {_delegate: {_document: {data: {value: {mapValue: {fields}}}}}} = doc;
        if(fields.password.stringValue !== stuff.password) {
            alert("비밀번호가 일치하지 않습니다.");
            this.loading = false;
            return;
        } 

        // Login confirmed, now look up checkboxes to store id
          if(this.rememberID === true) {
            localStorage.setItem("storedID", this.data.nickname);
          } else {
            localStorage.setItem("storedID", "");
          }
          if(this.rememberPW === true) {
            localStorage.setItem("storedPW", this.data.password);
          } else {
            localStorage.setItem("storedPW", "");
          }

        // localstorage logic done

        this.$store.dispatch('updateStatus', fields);
        this.loading = false;
        this.dialog = false;
        this.login.text = "Sign out";
        this.isLoggedIn = true;
    
      } else {
        alert("메시지를 전송할 조건을 만족하지 않습니다.");
      }
    },
    clicked(e) {
        if(this.isLoggedIn === true) {
            e.preventDefault();
            alert("로그아웃 되었습니다.");
            if(window?.location) window.location.replace(window.location.href);
            else location.reload();
        }
    }
  },
  created() {
    /* ID */
    if(getItem("storedID").match(/[가-힣]/)) this.data.nickname = getItem("storedID") || '';
    else this.data.nickname = JSON.parse(getItem("storedID")) || '';
    if(this.data.nickname !== '') this.rememberID = true;

    /* PW */
    this.data.password = getItem("storedPW") || '';
    if(this.data.password !== '') this.rememberPW = true;
  },
};
</script>
<style>
</style>
