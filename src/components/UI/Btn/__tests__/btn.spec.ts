import { mount, MountOptions, Wrapper, createLocalVue } from "@vue/test-utils";
import Btn from "../index.vue";
import Spinner from "@/components/UI/Spinner/index.vue";

describe("Btn.vue", () => {
  type Instance = InstanceType<typeof Btn>;
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>;

  const localVue = createLocalVue();
  localVue.component("Spinner", Spinner);

  beforeEach(() => {
    mountFunction = (config = {}) => {
      return mount(Btn, {
        localVue,
        ...config,
      });
    };
  });

  it("Should mount the componente", () => {
    const wrapper = mountFunction();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should display the content passed by slot", () => {
    const wrapper = mountFunction({
      slots: {
        default: "My btn here",
      },
    });

    expect(wrapper.text()).toBe("My btn here");
  });

  it('Should have the "btn--primary" class when the prop is passed', () => {
    const wrapper = mountFunction({
      propsData: {
        primary: true,
      },
    });

    expect(wrapper.classes("btn--primary")).toBe(true);
  });

  it('Should have the "btn--secondary" class when the prop is passed', () => {
    const wrapper = mountFunction({
      propsData: {
        secondary: true,
      },
    });

    expect(wrapper.classes("btn--secondary")).toBe(true);
  });

  it('Should have the "btn--block" class when the prop is passed', () => {
    const wrapper = mountFunction({
      propsData: {
        block: true,
      },
    });

    expect(wrapper.classes("btn--block")).toBe(true);
  });

  it('Should emit "click" event when is clicked', () => {
    const onClick = jest.fn();
    const wrapper = mountFunction({
      listeners: {
        click: onClick,
      },
    });

    wrapper.find("button").trigger("click");

    expect(onClick).toHaveBeenCalled();
  });
});
