import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    clients: [],
    tags: []
  },
  getters: {
    countClients: state => state.clients.length,
    countTags: state => state.tags.length,
    isLoading: state => state.loading
  },
  mutations: {
    loading(state) {
      state.loading = !state.loading;
    },
    loadClients(state, clients) {
      state.clients = clients;
    },
    loadTags(state, tags) {
      state.tags = tags;
    },
    destroyTag(state, tag) {
      state.tags = state.tags.filter(t => t != tag);
    }
  },
  actions: {
    async loadClients({ commit }) {
      commit("loading");
      const { data } = await api.get("clients");
      commit("loadClients", data);
      commit("loading");
    },
    async loadTags({ commit }) {
      commit("loading");
      const { data } = await api.get("tags");
      commit("loadTags", data);
      commit("loading");
    },
    async destroyTag({ commit }, tag) {
      await api
        .delete(`tags/${tag.id}`)
        .then(() => {
          commit("destroyTag", tag);
        })
        .catch(error => console.error(error));
    }
  }
});
