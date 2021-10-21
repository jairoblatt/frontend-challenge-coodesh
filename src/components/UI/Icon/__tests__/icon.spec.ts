import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Icon from "../index.vue";

describe("Icon unit tests", () => {
  type Instance = InstanceType<typeof Icon>;
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>;

  beforeEach(() => {
    mountFunction = (config = {}) => {
      return mount(Icon, {
        ...config,
      });
    };
  });

  it("Should mount the componente", () => {
    const wrapper = mountFunction();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Should display element "i" when the prop icon is passed', () => {
    const wrapper = mountFunction({
      propsData: {
        icon: "mdi-eye",
      },
    });
    expect(wrapper.find("i").exists()).toBe(true);
  });

  it('Should display element "i" when the slot default is passed', () => {
    const wrapper = mountFunction({
      slots: {
        default: "mdi-eye",
      },
    });

    const iElement = wrapper.find("i");
    expect(iElement.element).toBeInstanceOf(HTMLElement);
    expect(iElement.exists()).toBe(true);
  });

  it("Should apply the css property", () => {
    const wrapper = mountFunction({
      propsData: {
        size: 20,
        color: "red",
        icon: "mdi-user",
      },
    });

    const elementStyleAttribute = wrapper.find("i").attributes().style;
    expect(elementStyleAttribute).toContain("font-size: 20px");
    expect(elementStyleAttribute).toContain("color: red");
  });
});
