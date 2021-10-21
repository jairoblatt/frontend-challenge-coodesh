import { GetterTree, MutationTree, ActionTree } from "vuex";
import { IAlert } from "@/types/IAlert";

export const state = () => ({
  alerts: [] as IAlert[],
});

export type AlertState = ReturnType<typeof state>;

export const getters: GetterTree<AlertState, AlertState> = {
  get: (state) => state.alerts[0] || null,
};

export const mutations: MutationTree<AlertState> = {
  SET_ALERT(state, payload) {
    state.alerts.push(payload);
  },

  UPDATE_ALERT(state, payload) {
    state.alerts = payload;
  },
};

export const actions: ActionTree<AlertState, AlertState> = {
  set({ commit }, payload: IAlert) {
    const { timeOut } = payload;
    commit("SET_ALERT", {
      ...payload,
      timeOut: timeOut === false ? timeOut : Number(timeOut) > 1 ? timeOut : 10000,
      id: Math.random()
        .toString(36)
        .substr(2),
    });
  },

  remove({ commit, state }, alertId) {
    commit(
      "UPDATE_ALERT",
      state.alerts.filter(({ id }) => id !== alertId)
    );
  },
};
