<template>
  <v-container class="grey lighten-5 ma-10">
    <v-row no-gutters>
      <Lee />
      <!-- <template v-for="n in 4">
        <v-col :key="n">
          <v-card class="pa-8" outlined tile> Column </v-card>
        </v-col>
        <v-responsive
          v-if="n === 2"
          :key="`width-${n}`"
          width="100%"
        ></v-responsive>
      </template> -->
      <v-col class="mx-12 my-12">
        <v-card class="mb-8">
          <v-card-title class="mx-2 mb-2">
            Teams
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <div class="v-list-item-group" role="listbox">
            <div 
            v-for="team in teams" 
            :key="team.nickname"
            role="listitem"
            class="v-list-item"
             >
              <template>
                <v-card
                  class="mx-auto mb-4"
                  outlined
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-subtitle class="mb-1">
                        {{team.nickname}}
                      </v-list-item-subtitle>
                      <v-list-item-title class="text-h5 mb-1">
                        Headline 5
                      </v-list-item-title>
                      <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-avatar
                      size="80"
                      color="grey"
                    >
                      <img :src="team.avatar" />
                    </v-list-item-avatar>
                  </v-list-item>
                </v-card>
              </template>
            </div>
          </div>
        </v-card>
        <v-card>
          <v-card-title class="mx-2 mb-2">
            Board
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <div class="v-list-item-group">
            <div 
            v-for="notice in notices" 
            :key="notice.id"
            role="listitem"
            class="v-list-item"
             >
            
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col class="mx-6 my-12">
        <v-card class="mb-8">
          <v-card-title class="mx-2 mb-2">
            Notice
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          <div class="v-list-item-group">
            <div 
            v-for="board in boards" 
            :key="board.id"
            role="listitem"
            class="v-list-item"
             >
            
            </div>
          </div>
        </v-card>
        <v-card>
          <v-card-title class="mx-2 mb-2">
            어떻게 쓸 지 고민중인 부분
          </v-card-title>
          <v-divider class="mx-4"></v-divider>
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Lee from "./Lee.vue"
import { db, storage } from "../firebase.js"
export default {
  data() {
    return {
      teams: [],
      notices: [],
      boards: []
    }
  },
  components: {
    Lee
  },
  created() {
    // Teams
    db.collection("Team").onSnapshot((res) => {
      const changes = res.docChanges();
      let avatar;
      changes.forEach((item) => {
        if (item.type === "added") {
          storage
          .ref(`Team/${item.doc.data().profilePicture}`)
          .getDownloadURL()
          .then((url) => {
            avatar = url;
            this.teams.push({
              ...item.doc.data(),
              avatar
            });
          })
          .catch((err) => console.error(err));            
        }
      })
    });
    
    // Notice


    // Board
  },
};
</script>
<style></style>
