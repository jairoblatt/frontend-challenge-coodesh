import { mount, Wrapper, MountOptions, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import * as AlertModule from "@/store/modules/alert";
import AlertComponent from "../index.vue";
import Icon from "@/components/UI/Icon/index.vue";
import Btn from "@/components/UI/Btn/index.vue";
import Spinner from "@/components/UI/Spinner/index.vue";
import { Alert } from "@/types/Alert";

describe("Alert.vue ", () => {
  const localVue = createLocalVue();
  localVue.component("Icon", Icon);
  localVue.component("Btn", Btn);
  localVue.component("Spinner", Spinner);
  localVue.use(Vuex);

  const removeAlertSpy = jest.spyOn((AlertComponent as any).options.methods, "removeAlert");

  type Instance = InstanceType<typeof AlertComponent>;
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>;

  const alertContent: Alert = {
    id: "123",
    timeOut: 1000,
    title: "My title",
    description: "My description",
    theme: "fail",
  };

  beforeEach(() => {
    mountFunction = (options = {}) => {
      const store = new Vuex.Store({
        modules: {
          alert: {
            namespaced: true,
            ...AlertModule,
          },
        },
      });

      return mount(AlertComponent, {
        propsData: {
          content: alertContent,
        },
        ...options,
        store,
        localVue,
      });
    };
  });

  it("Should mount the component", () => {
    const wrapper = mountFunction();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should apply the current alert theme", () => {
    const wrapper = mountFunction();
    expect(wrapper.classes("alert--" + alertContent.theme)).toBe(true);
  });

  it('Should call the dispatch "alert/remove" when Btn is clicked', () => {
    const wrapper = mountFunction();

    wrapper.findComponent(Btn).trigger("click");

    expect(removeAlertSpy).toHaveBeenCalled();
  });

  it('Should render the "title" and "description" when content prop is passed', () => {
    const wrapper = mountFunction();

    const spanElement = wrapper.findAll("span").at(1);
    const pElement = wrapper.find("p");

    expect(spanElement.text()).toBe(alertContent.title);
    expect(pElement.text()).toBe(alertContent.description);
  });

  it('Should have "mdi-close" into btn', () => {
    const wrapper = mountFunction();

    const iconComponent = wrapper.findComponent(Icon);

    expect(iconComponent.classes()).toEqual(["mdi", "mdi-close"]);
  });
});
