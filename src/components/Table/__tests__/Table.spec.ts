import { mount, Wrapper, MountOptions, createLocalVue } from "@vue/test-utils";
import Table from "../index.vue";
import TableItem from "../TableItem.vue";
import Btn from "@/components/UI/Btn/index.vue";
import Spinner from "@/components/UI/Spinner/index.vue";
import Avatar from "@/components/UI/Avatar/index.vue";

const localVue = createLocalVue();
localVue.component("TableItem", TableItem);
localVue.component("Btn", Btn);
localVue.component("Spinner", Spinner);
localVue.component("Avatar", Avatar);

type Instance = InstanceType<typeof Table>;
let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>;

const $router = {
  push: jest.fn(),
};

const $route = {
  query: "?seed=123asd&page=2",
};

function fakeUsers() {
  return Array.from({ length: 5 }, () => ({
    name: {
      first: "Name",
      last: "Here",
    },
    gender: "Male",
    dob: {
      age: 20,
    },
    login: {
      username: "my-login",
    },
    picture: {
      thumbnail: "avatar.png",
    },
  }));
}

describe("Table.vue ", () => {
  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(Table, {
        ...options,
        localVue,
        stubs: {
          Transition: false,
        },
        mocks: {
          $router,
          $route,
        },
      });
    };
  });

  it("Should mount the component", () => {
    const wrapper = mountFunction();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("Should render the tableItem component when has user", async () => {
    const wrapper = mountFunction({
      propsData: {
        users: fakeUsers(),
      },
    });

    expect(wrapper.findComponent(TableItem).exists()).toBe(true);
  });

  it("Should render 5 tabItem based in users prop", () => {
    const wrapper = mountFunction({
      propsData: {
        users: fakeUsers(),
      },
    });

    expect(wrapper.findAllComponents(TableItem)).toHaveLength(5);
  });

  it("Should redirect route when a user is clicked", () => {
    const users = fakeUsers();

    const wrapper = mountFunction({
      propsData: {
        users,
      },
    });

    const btnComponent = wrapper.findAllComponents(Btn).at(0);
    btnComponent.trigger("click");

    expect($router.push).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith({
      name: "user",
      params: {
        username: users[0].login.username,
      },
      query: $route.query,
    });
  });
});
