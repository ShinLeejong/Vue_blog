import Vue from "vue";
import Vuex, { Store } from "vuex";
import { storage } from "../../firebase.js";
import Guest from "../../assets/team_avatars/Guest.jpg"; // index.d.ts

Vue.use(Vuex); // Register

interface StoreState {
  geoData: Record<string, never>;
  status: {
    isLoggedIn: boolean;
    name: {
      stringValue: string;
    };
    avatar: "*.jpg";
  };
}

export const store: Store<StoreState> = new Vuex.Store({
  strict: false,
  state: {
    geoData: {},
    dialog: false,
    // products: [
    //   { name: "apple", price: 400 },
    //   { name: "banana", price: 320 },
    //   { name: "kiwi", price: 310 },
    //   { name: "plum", price: 260 },
    //   { name: "potato", price: 350 }
    // ]
    status: {
      isLoggedIn: false,
      name: {
        stringValue: "Guest",
      },
      avatar: Guest,
    },
  },
  getters: {
    getGeoInfo: (geoData) => geoData,
  },
  mutations: {
    getWeather: (state, payload): void => {
      state.geoData = payload;
    },
    openDialog: (state): void => {
      state.dialog = true;
    },
    closeDialog: (state): void => {
      state.dialog = false;
    },
    updateStatus: (state, payload): void => {
      storage
        .ref(`Team/${payload.profilePicture.stringValue}`)
        .getDownloadURL()
        .then((url) => {
          const upload = payload;
          upload.avatar = url;
          upload.isLoggedIn = true;
          state.status = upload;
        })
        .catch((err) => console.error(err));
      // state.status.avatar
    },
  },
  actions: {
    getGeoAndWeather: (context): void => {
      let datas;
      const doSomething = new Promise((resolve, reject) => {
        resolve(context.commit("geoAndWeather"));
        reject(
          "Promise isn't completed successfully in getGeoAndWeather in store.ts"
        );
      });
      doSomething.then((data) => (datas = data));
      if (datas) return datas;
      doSomething.catch((error) => console.error(error));
    },

    updateStatus: (context, payload) => {
      return context.commit("updateStatus", payload);
    },
  },
});
