import { mount, Wrapper, MountOptions } from "@vue/test-utils";
import Avatar from "../index.vue";

describe("Avatar.vue", () => {
  type Instance = InstanceType<typeof Avatar>;
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>;

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(Avatar, {
        ...options,
      });
    };
  });

  it("Should mount component", () => {
    const wrapper = mountFunction();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should be render the current element when the prop tag is passed", () => {
    const wrapper = mountFunction({
      propsData: {
        tag: "small",
      },
    });

    expect(wrapper.find("small")).toBeDefined();
  });

  it("Should apply the styles size and border when the respective props is passed", () => {
    const wrapper = mountFunction({
      propsData: {
        size: 4,
        border: 10,
      },
    });

    const divElement = wrapper.find("div");

    expect(divElement.attributes("style")).toBe("height: 4rem; width: 4rem; border-width: 10px;");
  });

  it("Should render the slot content when them it is passed", () => {
    const slotContent = `<h2>Something</h2>`;

    const wrapper = mountFunction({
      slots: {
        default: slotContent,
      },
    });
    expect(wrapper.find("h2").text()).toBe("Something");
  });
});
