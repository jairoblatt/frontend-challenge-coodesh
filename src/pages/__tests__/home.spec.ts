import { mount, MountOptions, Wrapper, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import * as UsersModule from "@/store/modules/users";
import { MockUser } from "@/utils/tests";
import SearchBar from "@/components/SearchBar/index.vue";
import SearchFilter from "@/components/SearchFilter/index.vue";
import Table from "@/components/Table/index.vue";
import Pagination from "@/components/UI/Pagination/index.vue";
import Avatar from "@/components/UI/Avatar/index.vue";
import Btn from "@/components/UI/Btn/index.vue";
import Icon from "@/components/UI/Icon/index.vue";
import Spinner from "@/components/UI/Spinner/index.vue";
import Home from "../index.vue";
import { clickOutside } from "@/directives";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.directive("clickOutside", clickOutside);
Object.entries({ SearchBar, SearchFilter, Table, Pagination, Avatar, Btn, Icon, Spinner }).forEach(
  ([componentName, component]) => {
    localVue.component(componentName, component);
  }
);

type Instance = InstanceType<typeof Home>;
let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>;

const spyMethod = (methodName: string) => {
  return jest.spyOn((Home as any).options.methods, methodName);
};

const spyOns = {
  fetchUser: spyMethod("fetchUser"),
};

const $router = {
  push: jest.fn(),
  replace: jest.fn(),
};

const $route = {
  query: {
    seed: "test",
    page: "1",
  },
};

describe("Home.vue ", () => {
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
      },
    });

    mountFunction = (options = {}) => {
      return mount(Home, {
        localVue,
        store,
        stubs: ["RouterView"],
        mocks: {
          $router,
          $route,
        },
        ...options,
      });
    };
  });

  afterEach(() => {
    $router.replace.mockClear();
  });

  it("Should mount the component", () => {
    const wrapper = mountFunction();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Should call "fetchUser" method when its created', () => {
    expect(spyOns.fetchUser).toHaveBeenCalledWith($route.query);
  });

  it('Should set in the "filter" data the gender and nat query', () => {
    const query = { gender: "male", nat: "australian" };
    const wrapper: any = mountFunction({
      mocks: {
        $route: {
          query,
        },
      },
    });

    expect(wrapper.vm.filters.gender).toBe(query.gender);
    expect(wrapper.vm.filters.nat).toBe(query.nat);
  });

  it("Should replace route", () => {
    const wrapper = mountFunction();
    const fetchInfo = {
      seed: "another_seed",
      page: "2",
    };

    (wrapper.vm as any).$options.watch.usersFetchInfo.call(wrapper.vm, fetchInfo);

    expect($router.replace).toHaveBeenCalledWith({ query: fetchInfo });
  });

  it("Should not replace route when the query page/gender/nat it's the same of fetchInfo page/gender/nat", () => {
    const wrapper = mountFunction();
    (wrapper.vm as any).$options.watch.usersFetchInfo.call(wrapper.vm, { page: 1 });

    expect($router.replace).not.toHaveBeenCalled();
  });

  it('Should return undefined when the watcher "usersFetchInfo" dont have a truthy param', () => {
    const wrapper = mountFunction();
    const usersFetchInfo = (wrapper.vm as any).$options.watch.usersFetchInfo;

    expect(usersFetchInfo.call(wrapper.vm, null)).toBe(undefined);
  });
});
