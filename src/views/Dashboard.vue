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
    console.log(true);
  }
};
</script>
<style></style>
