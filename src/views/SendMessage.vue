<template>
  <div>
    <v-dialog max-width="32rem" v-model="dialog">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" class="purple white--text ma-2 ml-4">메시지 보내기</v-btn>
      </template>
      <v-card>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="ma-2">
              <p class="text-h5 text-center">메시지 보내기</p>
            </v-list-item-title>
            <v-list-item-subtitle>
              <p class="subheading text-center">
                Lee에게 개인적으로 쪽지를 전달합니다. <br />
                회신받을 이메일 혹은 전화번호를 적어주세요.
                </p>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-card-text>
          <v-form class="pa-1" ref="form">
            <v-text-field
              label="성함"
              v-model="message.name"
              placeholder="보내는 분의 성함"
              prepend-icon="mdi-id-card"
              required
            ></v-text-field>
            <v-text-field
              label="제목"
              v-model="message.title"
              placeholder="제목"
              prepend-icon="mdi-format-title"
              required
            ></v-text-field>
            <v-textarea
              label="내용"
              v-model="message.content"
              placeholder="내용"
              prepend-icon="mdi-text-box-outline"
              required
            >

            </v-textarea>
            <v-flex xs12 sm6 offset-sm1>
              <v-btn raised class="primary" @click="onPickFile">이미지 업로드</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/jpg"
                @change="onProfilePictureChange"
              />
              <p id="image_title" class="mt-2"></p>
            </v-flex>
            <v-text-field
              label="회신받을 이메일 혹은 연락처"
              v-model="message.contact"
              prepend-icon="mdi-email"
              required
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
// 나이 will be auto-generated in logic part
export default {
  /* eslint-disable */
  data() {
    return {
      message: {
        contact: '',
        name: '',
        title: '',
        content: '',
        photo: '',
        photo_name: '',
      },
        loading: false,
        dialog: false,
    };
  },
  methods: {
    reset: function () {
      this.message.contact = '';
      this.message.name = '';
      this.message.title = '';
      this.message.content = '';
      this.message.photo = undefined;
    },
    onPickFile: function () {
      this.$refs.fileInput.click();
    },
    onProfilePictureChange: function (e) {
      const {target: {files}} = e;
      if(files[1]) {
        alert("죄송합니다. 이미지는 하나만 등록해주세요.");
        return;
      }
      const filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        alert("올바르지 않은 파일입니다.");
        return;
      }
      this.photo_name = filename;
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.message.photo = fileReader.result;
      })
      fileReader.readAsDataURL(files[0]);
      this.message.photo = files[0];
      
      const image_title = document.querySelector("#image_title");
      image_title.innerText = `등록됨: ${this.message.photo.name}`
      console.log(this.message.photo);
    },
    submit: function () {
      const stuff = {
        contact: this.message.contact,
        name: this.message.name,
        title: this.message.title,
        content: this.message.content,
        photo: this.message.photo,
        date: new Date(),
      };
      if (stuff?.contact === ''
            || stuff.name === ''
            || stuff.title === ''
            || stuff.content === '') {
                alert("입력되지 않은 내용이 있습니다.\n" +
                        "이미지는 필수 입력사항이 아닙니다.");
                return;
            }
      if (this.$refs.form.validate()) {
        this.loading = true;
        db.collection("Personal Message")
          .add(stuff)
          .then((data) => {
            alert("메시지 전송을 완료하였습니다!");
            this.loading = false;
            this.dialog = false;
            if(stuff.photo) {
                const ref = storage.ref();
                const go = ref.child("Personal Message")
                                .child(`${stuff.name}/${stuff.date}/${this.photo_name}`)
                                .putString(stuff.photo, "data_url");
                go.on('state_changed', snapshot => {
                    console.log(snapshot);
                })                
            }
          });
      } else {
        alert("메시지를 전송할 조건을 만족하지 않습니다.");
      }
    },
  },
};
</script>
<style></style>
