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
    filterTags: state => filter =>
      state.tags.filter(tag => tag.name.toLowerCase().match(filter)),
    avaliableTags: state => state.tags.map(tag => tag.name),
    isLoading: state => state.loading
  },
  mutations: {
    loading(state) {
      state.loading = !state.loading;
    },
    loadClients(state, clients) {
      state.clients = clients;
    },
    storeClient(state, client) {
      state.clients.unshift(client);
    },
    updateClient(state, client) {
      const i = state.clients.findIndex(c => c.id == client.id);
      state.clients.splice(i, 1, client);
    },
    destroyClient(state, client) {
      state.clients = state.clients.filter(c => c != client);
    },
    loadTags(state, tags) {
      state.tags = tags;
    },
    storeTag(state, tag) {
      state.tags.unshift(tag);
    },
    updateTag(state, tag) {
      const i = state.tags.findIndex(t => t.id == tag.id);
      state.tags.splice(i, 1, tag);
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
    async filterClients({ commit }, filter) {
      await api
        .get(`/clients?search=${filter}`)
        .then(({ data }) => commit("loadClients", data))
        .catch(err => console.error(err));
    },
    async storeClient({ commit }, client) {
      await api
        .post("/clients", client)
        .then(({ data }) => commit("storeClient", data))
        .catch(err => console.error(err));
    },
    async updateClient({ commit }, client) {
      await api
        .put(`/clients/${client.id}`, client)
        .then(({ data }) => {
          commit("updateClient", data);
        })
        .catch(err => console.error(err));
    },
    async destroyClient({ commit }, client) {
      await api
        .delete(`clients/${client.id}`)
        .then(() => commit("destroyClient", client))
        .catch(err => console.error(err));
    },
    async loadTags({ commit }, loading = true) {
      loading ? commit("loading") : null;
      const { data } = await api.get("tags");
      commit("loadTags", data);
      loading ? commit("loading") : null;
    },
    async filterTags({ commit }, filter) {
      await api
        .get(`/tags?search=${filter}`)
        .then(({ data }) => commit("loadTags", data))
        .catch(err => console.error(err));
    },
    async storeTag({ commit }, tag) {
      await api
        .post("/tags", tag)
        .then(({ data }) => commit("storeTag", data))
        .catch(err => console.error(err));
    },
    async updateTag({ commit }, tag) {
      await api
        .put(`/tags/${tag.id}`, tag)
        .then(({ data }) => {
          commit("updateTag", data);
        })
        .catch(err => console.error(err));
    },
    async destroyTag({ commit }, tag) {
      await api
        .delete(`tags/${tag.id}`)
        .then(() => {
          commit("destroyTag", tag);
        })
        .catch(err => console.error(err));
    }
  }
});
