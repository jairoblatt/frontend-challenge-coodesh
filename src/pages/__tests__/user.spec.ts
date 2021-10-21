import { mount, MountOptions, Wrapper, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import * as AlertModule from "@/store/modules/alert";
import * as UsersModule from "@/store/modules/users";
import User from "../user.vue";
import { MockUser } from "@/utils/tests";
import VueMeta from "vue-meta";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueMeta);

Object.entries({ Btn, Icon, Avatar, Spinner, ContentInfo, UrlClipBoard }).forEach(
  ([componentName, component]) => {
    localVue.component(componentName, component);
  }
);

type Instance = InstanceType<typeof User>;
let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>;

const $route = {
  params: {
    username: MockUser.login.username,
  },
};

const $router = {
  push: jest.fn(),
};

const goToUsersSpy = jest.spyOn((User as any).options.methods, "goToUsers");

describe("User.vue ", () => {
  beforeEach(() => {
    const store = new Vuex.Store({
      modules: {
        users: {
          namespaced: true,
          ...UsersModule,
          state: {
            users: [MockUser],
          },
        },
        // eslint-disable-next-line
        // @ts-ignore
        alert: {
          namespaced: true,
          ...AlertModule,
        },
      },
    });

    mountFunction = (options = {}) => {
      return mount(User, {
        localVue,
        store,
        mocks: {
          $route,
          $router,
        },
        ...options,
      });
    };
  });

  it("Should mount the component", () => {
    const wrapper = mountFunction();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should mount the avatar component when", () => {
    const wrapper = mountFunction();

    const avatarComponent = wrapper.findComponent(Avatar);
    const imageElement = avatarComponent.find("img");

    expect(imageElement.attributes()).toEqual({
      src: MockUser.picture.large,
      alt: MockUser.name.first + " avatar",
    });
    expect(avatarComponent.exists()).toBe(true);
  });

  it('Should call "goToUsers" method and next call the push router method when button is clicked', () => {
    const wrapper = mountFunction();

    const btnComponent = wrapper.findComponent(Btn);
    btnComponent.trigger("click");

    expect(goToUsersSpy).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalled();
  });

  it('Should render 6 "ContentInfo" component', () => {
    const wrapper = mountFunction();

    expect(wrapper.findAllComponents(ContentInfo)).toHaveLength(6);
  });

  it('Should render the "ContentInfo" id when user has id', () => {
    const wrapper = mountFunction();

    const contentInfoComponent = wrapper.find('[data-testid="idContentInfo"]');

    expect(contentInfoComponent.text()).toBe(`${MockUser.id.name}: ${MockUser.id.value}`);
  });

  it('Should set alert message when "userFilteredByUsername" length is 0', async () => {
    const wrapper = mountFunction();

    wrapper.vm.$store.commit("users/SET_USERS", []);

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.getters["alert/get"]).toBeTruthy();
    expect(goToUsersSpy).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalled();
  });

  it("Should set username in the page meta", () => {
    const wrapper = mountFunction();

    expect(wrapper.vm.$meta().refresh().metaInfo.title).toBe(
      `${MockUser.name.first} ${MockUser.name.last}`
    );
  });
});
