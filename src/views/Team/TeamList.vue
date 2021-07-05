<template>
  <v-layout row wrap>
    <v-flex xs12 sm6 md4 lg3 v-for="mate in teams" :key="mate.nickname">
      <v-card
        class="text-center ma-3 team-card"
        @click.stop="onCardClicked(mate.nickname)"
      >
        <v-responsive class="pt-4">
          <v-badge
            overlap
           :color="teamColor(mate.nickname, mate.sex)"
           :icon="teamBadge(mate.nickname, mate.sex)">
            <v-avatar size="102" :class="teamColor(mate.nickname, mate.sex)">
              <v-avatar size="100">
                <img :src="mate.avatar" :alt="mate.name + '\'s avatar'" />
              </v-avatar>
            </v-avatar>
          </v-badge>
          <v-dialog
            v-model="dialog"
            max-width="480"
            transition="dialog-top-transition"
          >
            <v-card :loading="loading" max-width="480" class="pt-4 px-4 pb-8">
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-responsive :aspect-ratio="3 / 2">
                <v-img height="320" :src="selected.avatar"></v-img>
              </v-responsive>

              <v-card-title class="mx-2 mb-2">{{
                selected.nickname
              }}</v-card-title>
              <v-card-subtitle class="mx-2 mb-2"
                >{{ selected.name }}, {{ selected.age }}세</v-card-subtitle
              >
              <v-card-text>
                <v-row align="center" class="mx-0 mb-2">
                  <v-icon left>mdi-gender-male-female</v-icon>
                  <div class="grey--text">
                    {{ selected.sex }}({{
                      selected.sex === "Male" ? "남성" : "여성"
                    }})
                  </div>
                </v-row>
                <v-row align="center" class="mx-0 mb-2" v-if="selected.address">
                  <v-icon left>mdi-location-enter</v-icon>
                  <div class="grey--text">{{ selected.address }}에 거주</div>
                </v-row>
                <v-row align="center" class="mx-0 my-2">
                  <v-icon left>mdi-cake-variant</v-icon>
                  <div class="grey--text">{{ selected.birth }}</div>
                </v-row>
                <v-row align="center" class="mx-0 my-2">
                  <v-icon left>mdi-fire</v-icon>
                  <div class="grey--text">
                    팀 내에서 {{ selected.role }}을(를) 맡고 있음
                  </div>
                </v-row>
                <v-row align="center" class="mx-0 my-2">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn text v-on="on" class="px-2" @click.stop="modal = true">
                        <v-icon left>mdi-email</v-icon>
                        <div class="grey--text text-lowercase">{{ selected.email }}</div>
                      </v-btn>
                    </template>
                    <span>이메일을 보내려면 클릭</span>
                  </v-tooltip>
                  <v-dialog persistent v-model="modal" max-width="320">
                    <v-card>
                      <v-card-title class="text-h5 text-center">
                        이메일 전송
                      </v-card-title>
                      <v-card-text>
                        <v-form class="pa-1 emailForm">
                          <input type="hidden" name="to_name" :value="selected.nickname" />
                          <input type="hidden" name="to_email" :value="selected.email" />
                          <h5 readonly>
                           받는 사람: {{selected.nickname}}({{selected.name}})
                          </h5>
                          <h5 readonly>
                           받는 주소: {{selected.email}}
                          </h5>
                          <input type="hidden" name="from_name" :value="email.name" />
                          <input type="hidden" name="reply_to" :value="email.address" />
                          <input type="hidden" name="from_email" :value="email.address" />
                          <v-text-field
                           label="작성자 이름"
                           v-model.lazy="email.name"
                           >
                          </v-text-field>
                          <v-text-field
                           label="작성자 이메일"
                           v-model.lazy="email.address"
                           >
                          </v-text-field>
                          <v-text-field
                           label="제목"
                           name="title"
                           v-model.lazy="email.title"
                           >
                          </v-text-field>
                          <input type="hidden" name="message" :value="email.content" />
                          <v-textarea
                           label="내용"
                           name="message_html"
                           v-model.lazy="email.content"
                           >
                          </v-textarea>
                        </v-form>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="error"
                          @click="onResetClicked(false)"
                         >리셋</v-btn>
                        <v-btn
                          color="info"
                          @click="modal = false"
                         >취소</v-btn>
                        <v-btn
                          color="success"
                          @click="onEmailSubmit"
                         >전송</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
                <v-row align="center" class="mx-0 my-2">
                  <v-icon left>mdi-content-copy</v-icon>
                  <div class="grey--text">
                    {{
                      selected.introduce
                        ? selected.introduce
                        : "작성된 자기소개가 없습니다."
                    }}
                  </div>
                </v-row>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
              <v-card-title class="mx-2">취미</v-card-title>
              <v-card-text>
                <v-chip-group
                  v-model="selection"
                  active-class="deep-purple accent-4 white--text"
                  column
                >
                  <v-chip color="primary">{{ selected.hobby }}</v-chip>
                </v-chip-group>
              </v-card-text>
              <v-row justify="center">
                <v-btn color="info" text @click="closeDialog"> 나가기 </v-btn>
              </v-row>
            </v-card>
          </v-dialog>
        </v-responsive>
        <v-card-text>
          <div class="subheading">{{ mate.name }}</div>
          <div class="black--text">{{ mate.nickname }}</div>
          <div class="grey--text">{{ mate.role }}</div>
          <div class="grey--text">{{ mate.age }}</div>
          <div class="grey--text">{{ mate.sex }}</div>
          <div class="grey--text">{{ mate.birth }}</div>
          <div class="grey--text">{{ mate.hobby }}</div>
        </v-card-text>
        <v-card-actions>
          <v-row class="mx-2 mb-1">
            <v-icon small left>mdi-email</v-icon>
            <span class="text-lowercase grey--text">{{ mate.email }}</span>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import getFromFirebase from "../../components/getFromFirebase";
import emailjs from "emailjs-com";
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } from '../../constants';
import { init as email_js_init} from 'emailjs-com';

export default {
  data() {
    return {
      dialog: false,
      loading: false,
      modal: false,
      selection: 0,
      teams: [],
      selected: {
        avatar: "",
        nickname: "",
        name: "",
        age: "",
        sex: "",
        address: "",
        birth: "",
        email: "",
        role: "",
        introduce: "",
        hobby: "",
      },
      email: {
        name: '',
        title: '',
        address: '',
        content: '',
      },
    };
  },
  methods: {
    onCardClicked: function (nickname) {
      this.dialog = true;
      this.selected =
        this.teams[this.teams.findIndex((ele) => ele.nickname === nickname)];
    },
    closeDialog() {
      this.dialog = false;
    },
    teamColor(nickname, sex) {
      if(nickname === "이종뚜") return 'red';
      if(nickname === "이니뚜") return 'blue';
      return sex === 'Male' ? 'yellow' : 'green'
    },
    teamBadge(nickname, sex) {
      if(nickname === '이종뚜') return 'mdi-crown'; 
      if(nickname === '이니뚜') return 'mdi-chess-queen';
      return sex === 'Male' ? 'mdi-face-man' : 'mdi-face-woman';
    },
    onResetClicked(submitted = false) {
      if(submitted || window.confirm("정말 초기화하시겠습니까? \n" + "수신인 정보를 제외하고 모두 초기화됩니다.")) {
        this.email.name = '';
        this.email.title = '';
        this.email.address = '';
        this.email.content = '';    
      } else return;
    },
    onEmailSubmit() {
      const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      const emailForm = document.querySelector(".emailForm");
      if(!this.email.address.match(emailRegExp)) return alert("보내는 사람의 이메일 주소가 올바르지 않습니다.");
      if(!this.selected.email.match(emailRegExp)) return alert("받는 사람의 이메일 주소가 올바르지 않습니다.");
      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailForm, EMAILJS_USER_ID)
        .then(() => {
          alert(`${this.selected.nickname}님에게 이메일 전송을 완료하였습니다. \n` + 
                `전송한 이메일 : ${this.selected.email}`);
          this.onResetClicked(true);
        })
        .catch(err => console.error(JSON.stringify(err)))
    },
  },
  created() {
    email_js_init(EMAILJS_USER_ID);
    this.teams = getFromFirebase("Team", true);
    if(this.$store.state.status.isLoggedIn) {
      this.email.name = this.$store.state.status.nickname.stringValue;
      this.email.address = this.$store.state.status.email.stringValue;
    }
  },
};
</script>

<style scoped>
.team-card:hover {
  opacity: 0.8;
}
</style>
