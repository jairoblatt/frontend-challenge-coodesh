import { mount, Wrapper, MountOptions, createLocalVue } from "@vue/test-utils";
import TableItem from "../TableItem.vue";
import Avatar from "@/components/UI/Avatar/index.vue";

describe("TableItem.vue ", () => {
  const localVue = createLocalVue();
  localVue.component("Avatar", Avatar);

  type Instance = InstanceType<typeof TableItem>;
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>;

  const propsContent = {
    avatar: "something.png",
    gender: "male",
    age: 24,
    name: {
      first: "Wonderful",
      last: "Name",
    },
  };

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(TableItem, {
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

  it("Should render the avatar component when avatar prop is passed", () => {
    const wrapper = mountFunction({
      propsData: propsContent,
    });

    expect(wrapper.findComponent(Avatar).exists()).toBe(true);
  });

  it("Should render the default slot when him is passed", () => {
    const slot = `<h5>Hello</h5>`;

    const wrapper = mountFunction({
      slots: {
        default: slot,
      },
    });

    expect(wrapper.find("h5").text()).toBe("Hello");
  });

  it("Should return the user fully name", () => {
    const wrapper = mountFunction({
      propsData: propsContent,
    });

    expect((wrapper.vm as any).nameResolve).toBe("Wonderful Name");
  });
});
