import { mount, Wrapper, MountOptions, createLocalVue } from "@vue/test-utils";
import ContentInfo from "../index.vue";
import Icon from "@/components/UI/Icon/index.vue";

const localVue = createLocalVue();
localVue.component("Icon", Icon);

type Instance = InstanceType<typeof ContentInfo>;
let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>;

describe("ContentInfo.vue ", () => {
  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(ContentInfo, {
        ...options,
        localVue,
      });
    };
  });

  it("Should mount the component", () => {
    const wrapper = mountFunction();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should render default slot when him is passed", () => {
    const slot = `<h5>Something</h5>`;
    const wrapper = mountFunction({
      slots: {
        default: slot,
      },
    });

    expect(wrapper.find("h5").exists()).toBe(true);
  });

  it("Should render the current icon", () => {
    const wrapper = mountFunction({
      propsData: {
        icon: "mdi-user",
      },
    });

    expect(wrapper.findComponent(Icon).classes()).toEqual(["mdi", "mdi-user"]);
  });
});
