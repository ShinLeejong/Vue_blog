import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuetify from 'vuetify'
import HelloWorld from "../../src/components/HelloWorld.vue";

// register Vuetify globally to let Jest know
const localVue = createLocalVue();
localVue.use(Vuetify);

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).not.toBeNull();
  });
});
