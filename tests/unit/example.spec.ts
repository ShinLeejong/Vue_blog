import { createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";

// register Vuetify globally to let Jest know
const localVue = createLocalVue();
localVue.use(Vuetify);

describe("Team.vue", () => {
  // it("renders props.msg when passed", () => {});
});
