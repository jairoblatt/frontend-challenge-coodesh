import { GetterTree, MutationTree, ActionTree } from "vuex";
import HTTPClient from "@/plugins/axios";
import { Nullable, Users, UserApiInfo } from "@/types/IUser";
import { sleep } from "@/utils";

export const state = () => ({
  users: null as Nullable<Users[]>,
  fetchInfo: null as Nullable<UserApiInfo>,
  fetchPending: false,
});

export type UserState = ReturnType<typeof state>;

export const getters: GetterTree<UserState, UserState> = {
  get: (state) => state.users,
  fetchInfo: (state) => state.fetchInfo,
  fetchPending: (state) => state.fetchPending,
};

export const mutations: MutationTree<UserState> = {
  SET_USERS(state, payload) {
    state.users = payload;
  },

  FETCH_PENDING(state, status) {
    state.fetchPending = status;
  },

  FETCH_INFO(state, info) {
    state.fetchInfo = info;
  },
};

export const actions: ActionTree<UserState, UserState> = {
  async fetch({ commit, state }, context) {
    commit("FETCH_PENDING", true);
    try {
      const gender = context?.gender;
      const nat = context?.nat;

      const { data } = await HTTPClient.get<Users>("/", {
        params: {
          results: 50,
          seed: context?.seed,
          page: context?.page || 1,
          nat,
          gender,
        },
      });

      if (data?.results) {
        commit("SET_USERS", [...(state.users || []), ...data.results]);
      }

      if (data?.info) {
        commit("FETCH_INFO", {
          ...data.info,
          ...(gender && { gender }),
          ...(nat && { nat }),
        });
      }
    } catch {
      commit("FETCH_INFO", null);
    } finally {
      await sleep(400);
      commit("FETCH_PENDING", false);
    }
  },
};
