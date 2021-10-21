import { mount, MountOptions, Wrapper, createLocalVue } from "@vue/test-utils";
import Pagination from "../index.vue";
import Spinner from "@/components/UI/Spinner/index.vue";

describe("Pagination unit tests", () => {
  type Instance = InstanceType<typeof Pagination>;
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>;

  const localVue = createLocalVue();

  localVue.component("Spinner", Spinner);

  beforeEach(() => {
    mountFunction = (config = {}) => {
      return mount(Pagination, {
        ...config,
        localVue,
      });
    };
  });

  it("Should mount the component", () => {
    const wrapper = mountFunction();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Should apply the "pagination--active" css class when the loading prop is true', () => {
    const wrapper = mountFunction({
      propsData: {
        loading: true,
      },
    });

    const wrapperElement = wrapper.findAll("div").at(0);

    expect(wrapperElement.classes("pagination--active")).toBe(true);
  });

  it("Should render spinner component when the loading prop it is true", () => {
    const wrapper = mountFunction({
      propsData: {
        loading: true,
      },
    });

    const spinnerComponent = wrapper.findComponent(Spinner);
    expect(spinnerComponent.attributes("style")).not.toBe("display: none;");
  });

  it('Should emit "loadMore" when the function it is called', () => {
    const wrapper = mountFunction();

    (wrapper.vm as any).onLoadMore();

    expect(wrapper.emitted("loadMore")).toBeTruthy();
    expect(wrapper.emitted("loadMore")?.length).toBe(1);
  });
});
