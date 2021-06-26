import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex); // Register

export const store = new Vuex.Store({
  strict: true,
  state: {
    geoData: {},
    // products: [
    //   { name: "apple", price: 400 },
    //   { name: "banana", price: 320 },
    //   { name: "kiwi", price: 310 },
    //   { name: "plum", price: 260 },
    //   { name: "potato", price: 350 }
    // ]
  },
  getters: {
    getGeoInfo: (geoData) => geoData.name,
  },
  mutations: {
    // reducePrice: (state, payload) =>
    //   state.products.forEach(ele => (ele.price -= payload))
    getWeather: (state, payload) => {
      state.geoData = payload;
      console.log(payload);
      console.log(state.geoData.name);
    },
  },
  actions: {
    // reducePrice: (context, payload) => {
    //   const doSomething = new Promise((resolve, reject) => {
    //     resolve(context.commit("reducePrice", payload));
    //     reject(
    //       "Promise isn't completed successfully in reducePrice in store.js"
    //     );
    //   });
    //   doSomething
    //     .then(() => console.log("Done!"))
    //     .catch(err => console.error(err));
    //   // setTimeout(() => {
    //   //   context.commit("reducePrice", payload);
    //   // }, 1000);
    // }
    getGeoAndWeather: (context) => {
      let datas;
      const doSomething = new Promise((resolve, reject) => {
        resolve(context.commit("geoAndWeather"));
        reject(
          "Promise isn't completed successfully in getGeoAndWeather in store.js"
        );
      });
      doSomething.then((data) => (datas = data));
      if (datas) return datas;
      doSomething.catch((error) => console.error(error));
    },
  },
});
