import { mount, Wrapper, MountOptions, createLocalVue } from "@vue/test-utils";
import UrlClipBoard from "../index.vue";
import Icon from "@/components/UI/Icon/index.vue";
import Btn from "@/components/UI/Btn/index.vue";
import Spinner from "@/components/UI/Spinner/index.vue";

const localVue = createLocalVue();
localVue.component("Icon", Icon);
localVue.component("Btn", Btn);
localVue.component("Spinner", Spinner);

type Instance = InstanceType<typeof UrlClipBoard>;
let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>;

const copyToClipBoardSpy = jest.spyOn((UrlClipBoard as any).options.methods, "copyToClipBoard");

describe("UrlClipBoard.vue ", () => {
  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(UrlClipBoard, {
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

  it('Should have "user__url--copied" css class when the copied data it is true', async () => {
    const wrapper = mountFunction();
    wrapper.setData({
      copied: true,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.classes("user__url--copied")).toBe(true);
  });

  it("Should return the current icon", () => {
    const wrapper = mountFunction();

    expect((wrapper.vm as any).iconClipBoard).toBe("mdi-content-copy");

    wrapper.setData({
      copied: true,
    });

    expect((wrapper.vm as any).iconClipBoard).toBe("mdi-check");
  });
});
