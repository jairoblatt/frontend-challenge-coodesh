import { mount, Wrapper, MountOptions, createLocalVue } from "@vue/test-utils";
import SearchBar from "@/components/SearchBar/index.vue";
import Icon from "@/components/UI/Icon/index.vue";

describe("SearchBar.vue ", () => {
  const localVue = createLocalVue();
  localVue.component("Icon", Icon);

  type Instance = InstanceType<typeof SearchBar>;
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>;

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(SearchBar, {
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

  it('Should emit "input" event when input element is typed', () => {
    jest.useFakeTimers();

    const wrapper = mountFunction({
      propsData: {
        debounceDelay: 0,
      },
    });

    wrapper.find("input").setValue("Something");

    jest.advanceTimersByTime(100);

    expect(wrapper.emitted("input")).toBeTruthy();
    expect(wrapper.emitted("input")?.length).toBe(1);
    expect(wrapper.emitted("input")?.[0]).toEqual(["Something"]);
  });

  it('Should render "Icon" component with the mdi-account icon', () => {
    const wrapper = mountFunction();

    const iconComponent = wrapper.findComponent(Icon);

    expect(iconComponent).toBeDefined();
  });
});
