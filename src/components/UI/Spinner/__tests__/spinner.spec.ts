import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import Spinner from "../index.vue";

describe("Spinner.vue", () => {
  type Instance = InstanceType<typeof Spinner>;
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>;

  beforeEach(() => {
    mountFunction = (config = {}) => {
      return mount(Spinner, {
        ...config,
      });
    };
  });

  it("Should mount the componente", () => {
    const wrapper = mountFunction();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Should set minHeight and minWidth of element when the "size" prop is passed', () => {
    const wrapper = mountFunction({
      propsData: {
        size: 20,
      },
    });

    const spinner = wrapper.find(".spinner").attributes().style;
    expect(spinner).toBe("min-height: 20px; min-width: 20px;");
  });
});
