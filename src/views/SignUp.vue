<template>
  <div>
    <v-dialog max-width="20rem" v-model="dialog">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" class="error">회원가입</v-btn>
      </template>
      <v-card>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="ma-2">
              <p class="text-h5 text-center">회원정보 등록</p>
            </v-list-item-title>
            <v-list-item-subtitle>
              <p class="subheading text-center">정보를 입력하여 회원가입</p>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-text>
          <v-form class="pa-1" ref="form">
            <v-text-field
              label="이름"
              v-model="team.name"
              prepend-icon="mdi-id-card"
            ></v-text-field>
            <v-text-field
              label="별명"
              v-model="team.nickname"
              placeholder="후에 아이디처럼 사용됩니다."
              prepend-icon="mdi-format-title"
            ></v-text-field>
            <v-text-field
              label="비밀번호"
              :type="'password'"
              v-model="team.password"
              prepend-icon="mdi-form-textbox-password"
            ></v-text-field>
            <v-text-field
              label="비밀번호 확인"
              :type="'password'"
              v-model="team.checkPassword"
              prepend-icon="mdi-lock-open-check-outline"
            ></v-text-field>
            <!-- mdi-face-recognition -->
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="onPickFile">업로드</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/jpg"
                @change="onProfilePictureChange"
              />
            </v-flex>
            <v-text-field
              label="내 역할"
              v-model="team.role"
              prepend-icon="mdi-play"
            ></v-text-field>
            <v-radio-group
              v-model="team.sex"
              prepend-icon="mdi-gender-male-female"
            >
              <template v-slot:label>
                <div>성별</div>
              </template>
              <v-radio value="Male">
                <template v-slot:label>
                  <div>남자</div>
                </template>
              </v-radio>
              <v-radio value="Female">
                <template v-slot:label>
                  <div>여자</div>
                </template>
              </v-radio>
            </v-radio-group>
            <v-menu max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="team.birth"
                  label="생일"
                  prepend-icon="mdi-calendar-range"
                  v-on="on"
                ></v-text-field>
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
            <v-btn text class="error ma-2" @click="reset">리셋</v-btn>
            <v-btn text class="success ma-2" @click="submit" :loading="loading"
              >등록</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { db, storage } from "../firebase.js";
import { formValidator } from './formValidater';
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
        password: '',
        checkPassword: '',
        profilePicture: {

        },
        nickname: '',
        role: '',
        sex: '',
      },
        loading: false,
        dialog: false,
        photo: '',
    };
  },
  methods: {
    reset: function () {
      this.team.name = '';
      this.team.nickname = '';
      this.team.password = '';
      this.team.checkPassword = '';
      this.team.role = '';
      this.team.sex = '';
      this.team.email = '';
      this.team.hobby = '';
      this.team.birth = '';
    },
    onPickFile: function () {
      this.$refs.fileInput.click();
    },
    onProfilePictureChange: function (e) {
      const {target: {files}} = e;
      if(files[1]) {
        alert("이미지는 하나만 등록해주세요.");
        return;
      }
      const filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        alert("올바르지 않은 파일입니다.");
        return;
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.photo = fileReader.result;
      })
      fileReader.readAsDataURL(files[0]);
      this.photo = files[0];
    },
    submit: function () {
      const match = /[0-9]+/;
      const getYear = new Date().getFullYear();
      const age = getYear - this.team.birth.match(match) + 1;
      const stuff = {
        name: this.team.name,
        nickname: this.team.nickname,
        password: this.team.password,
        profilePicture: `${this.team.nickname}/${this.team.nickname}.jpg`,
        role: this.team.role,
        sex: this.team.sex,
        email: this.team.email,
        hobby: this.team.hobby,
        birth: this.team.birth,
        date: new Date(),
        age
      };
      if (formValidator(stuff) === false) return;
      if (this.$refs.form.validate()) {
        this.loading = true;
        if(this.team.password !== this.team.checkPassword) {
          alert("비밀번호가 일치하지 않습니다.");
          this.team.password = '';
          this.team.checkPassword = '';
          this.loading = false;
          console.log(this.photo);
          console.log(this.profilePicture);
          return;
        }
        db.collection("Team")
          .add(stuff)
          .then((data) => {
            this.loading = false;
            this.dialog = false;
            const ref = storage.ref();
            const go = ref.child("Team")
                          .child(stuff.profilePicture)
                          .putString(this.photo, "data_url");
            go.on('state_changed', snapshot => {
              console.log(snapshot);
            })
            console.log(data);
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
