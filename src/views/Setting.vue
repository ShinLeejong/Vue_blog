<template>
  <v-list-item class="v-list-item-setting" @click="onSettingClicked">
    <v-list-item-action>
      <v-icon class="white--text">mdi-image-filter-tilt-shift</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title class="white--text">
        My Settings
      </v-list-item-title>
        <!-- Dialog of Setting -->
        <v-dialog v-model="settingDialog" max-width="600">
            <v-card
            :loading="settingLoading"
            max-width="600"
            class="pt-4 px-4 pb-8"
            >
            <v-list-item>
            <v-list-item-title class="text-center">
                설정
            </v-list-item-title>
            </v-list-item>
            <v-flex class="offset-md-8">
            <v-select
                :items="settingSelectbar"
                v-model="selection"
            ></v-select>
            </v-flex>
            <v-divider class="my-1"></v-divider>
            <!-- 설정 -->
            <!-- 개인 설정 -->
            <v-list-item v-if="selection === '개인 설정'">
            <v-list-item-content class="">
                <v-list-item-subtitle>
                <p class="subheading ml-4">로그인 관리</p>
                </v-list-item-subtitle>
                <v-col>
                <v-checkbox
                    v-model="setting.personal.storeID"
                    :label="'아이디 저장'"
                    class="ma-0 ml-4"
                ></v-checkbox>
                <v-checkbox
                    v-model="setting.personal.storePW"
                    :label="'비밀번호 저장'"
                    class="ma-0 ml-4"
                ></v-checkbox>
                </v-col>
            </v-list-item-content>
            </v-list-item>
            <!-- 개인 설정 -->
            <!-- 계정 설정 -->
            <v-list-item class="my-2 mb-8" v-if="selection === '계정 설정'">
                <v-list-item-title class="text-center mb-6">
                    계정 설정
                </v-list-item-title>
            </v-list-item>
            <!-- 계정 설정 -->
            <!-- UI -->
            <v-list-item class="my-2 mb-8" v-if="selection === 'UI'">
                <v-list-item-title class="text-center mb-6">
                    UI
                </v-list-item-title>
            </v-list-item>
            <!-- UI -->
            <!-- 설정 -->
            <v-row justify="center">
                <v-btn class="primary" @click="onSaveBtnClicked"> 저장 </v-btn>
            </v-row>
            </v-card>
        </v-dialog>
        <!-- Dialog of Setting -->
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  data() {
    return {
      settingDialog: false,
      settingLoading: false,
      selection: 'UI',
      setting: {
        personal: {
          storeID: false,
          storePW: false,
        },
        account: {},
        UI: {},
      },
    }
  },
  methods: {
    onSettingClicked: function () {
      this.settingDialog = true;
      this.setting.personal.storeID = localStorage.getItem("storedID")
        ? true
        : false;
      this.setting.personal.storePW = localStorage.getItem("storedPW")
        ? true
        : false;
    },
    onSaveBtnClicked() {
      /* logic start */
      /* loggedIn part start */
      if (this.$store.state.status.isLoggedIn) {
        /* personal start */
        /* storedID start */
        if (this.setting.personal.storeID === true) {
            localStorage.setItem(
            "storedID",
            this.$store.state.status.nickname.stringValue
            );
        } else {
            localStorage.setItem("storedID", "");
        }
        /* storedID end */
        /* storedPW start */
        if (this.setting.personal.storePW === true) {
            localStorage.setItem(
            "storedPW",
            this.$store.state.status.password.stringValue
            );
        } else {
            localStorage.setItem("storedPW", "");
        }
        /* storedPW end */
        /* personal end */
        /* account start */

        /* account end */
      }
      /* loggedIn part end */
      /* UI start */

      /* UI end */
      /* logic end */
      this.settingDialog = false;
      this.settingLoading = false;
    },
  },
  computed: {
    settingSelectbar: function () {
        return this.$store.state.status.isLoggedIn ?
        // logged in
        [
            "개인 설정",
            "계정 설정",
            "UI"
        ]
        :
        // NOT logged in
        [
            "UI"
        ];
    },
  }
}
</script>
