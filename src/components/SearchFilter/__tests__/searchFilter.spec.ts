import { mount, Wrapper, MountOptions, createLocalVue } from "@vue/test-utils";
import { transitionStub } from "@/utils/tests";
import SearchFilter from "@/components/SearchFilter/index.vue";
import Icon from "@/components/UI/Icon/index.vue";
import Btn from "@/components/UI/Btn/index.vue";
import Spinner from "@/components/UI/Spinner/index.vue";

const localVue = createLocalVue();
localVue.component("Icon", Icon);
localVue.component("Btn", Btn);
localVue.component("Spinner", Spinner);

type Instance = InstanceType<typeof SearchFilter>;
let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>;

const optionsMock = [
  {
    value: 1,
    name: "one",
  },
  {
    value: 2,
    name: "two",
  },
  {
    value: 3,
    name: "three",
  },
];

describe("SearchFilter.vue ", () => {
  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(SearchFilter, {
        ...options,
        localVue,
        stubs: {
          Transition: transitionStub(),
        },
      });
    };
  });

  it("Should mount the component", () => {
    const wrapper = mountFunction();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should open the options menu", () => {
    const wrapper = mountFunction();

    wrapper.find(".filter__input").trigger("click");
    expect((wrapper.vm as any).showOptions).toBe(true);
  });

  it("Should resolve and display the option name when the options is selected", () => {
    const wrapper = mountFunction({
      propsData: {
        options: optionsMock,
        value: optionsMock[0].value,
      },
    });
    const selectedOptionElement = wrapper.find(".filter__input").find("span");
    expect(selectedOptionElement.text()).toBe("one");
  });

  it("Should display the current icon when the options is closed or opened", async () => {
    const wrapper = mountFunction();

    const iconComponent = wrapper.find("i");
    expect(iconComponent.classes()).toEqual(["mdi", "mdi-chevron-down"]);

    wrapper.setData({ showOptions: true });
    await wrapper.vm.$nextTick();
    expect(iconComponent.classes()).toEqual(["mdi", "mdi-chevron-up"]);
  });

  it("Should render the default slot content when him is passed", () => {
    const slot = `<h5> Hi </h5>`;

    const wrapper = mountFunction({
      slots: {
        default: slot,
      },
    });

    const slotElement = wrapper.find("h5").exists();
    expect(slotElement).toBe(true);
  });

  it('Should select option when the "selectOption" is called only if the value !== of the option selected', () => {
    const wrapper = mountFunction({
      propsData: {
        options: optionsMock,
        value: optionsMock[2].value,
      },
    });

    const firstOptions = wrapper
      .find(".filter__options")
      .findAll("li")
      .at(0);

    firstOptions.trigger("click");

    expect(wrapper.emitted("input")).toBeTruthy();
    expect(wrapper.emitted("input")?.length).toBe(1);
    expect(wrapper.emitted("input")).toEqual([[optionsMock[0].value]]);
  });

  it('Should apply the css class "option--active" when the option is selected', async () => {
    const wrapper = mountFunction({
      propsData: {
        options: optionsMock,
        value: optionsMock[0].value,
      },
    });

    const optionActiveElement = wrapper.find(".option--active").exists();
    expect(optionActiveElement).toBe(true);
  });

  it("Should display 3 options", () => {
    const wrapper = mountFunction({
      propsData: {
        options: optionsMock,
      },
    });
    const optionsItemsElement = wrapper.find(".filter__options").findAll("li");
    expect(optionsItemsElement).toHaveLength(3);
  });
});
