<template>
  <div class="content">
    <ContentBar icon="people" label="Cliente" :counter="countClients">
      <b-icon icon="search" font-scale="2" />
      <input
        class="input-search"
        type="text"
        placeholder="Pesquisa..."
        v-b-tooltip.focus
        title="Pressione Enter para pesquisar o cliente pelo Nome, E-mail ou Empresa"
        v-on:keypress.enter="handleFilter"
      />

      <button
        class="btn btn-light btn-sm"
        v-b-modal.modal-form
        v-b-tooltip.hover.left
        title="Adicionar"
        type="button"
      >
        <b-icon icon="plus" font-scale="2"></b-icon>
      </button>
      <b-modal
        id="modal-form"
        :title="!edit ? 'Adicionar Cliente' : 'Editar Cliente' "
        @hidden="onReset"
      >
        <b-form id="handleSubmit" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Nome">
            <b-form-input placeholder="Nome" v-model="client.name" required />
          </b-form-group>

          <b-form-group label="E-mail">
            <b-form-input type="email" placeholder="E-mail" v-model="client.email" required />
          </b-form-group>

          <b-form-group label="Empresa">
            <b-form-input placeholder="Empresa" v-model="client.company" required />
          </b-form-group>

          <b-form-group label="Tags">
            <b-form-tags
              v-model="client.tags"
              size="lg"
              add-on-change
              no-outer-focus
              class="mb-2"
              :state="client.tags.length > 0"
            >
              <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                  <li v-for="tag in tags" :key="tag" class="list-inline-item">
                    <b-form-tag
                      @remove="removeTag(tag)"
                      :title="tag"
                      :disabled="disabled"
                      variant="warning"
                    >{{ tag }}</b-form-tag>
                  </li>
                </ul>
                <b-form-select
                  v-bind="inputAttrs"
                  v-on="inputHandlers"
                  :disabled="disabled || availableOptions.length === 0"
                  :options="availableOptions"
                >
                  <template v-slot:first>
                    <!-- This is required to prevent bugs with Safari -->
                    <option disabled value>Selecione as tags...</option>
                  </template>
                </b-form-select>
              </template>
            </b-form-tags>
          </b-form-group>
        </b-form>
        <template v-slot:modal-footer="{ ok, cancel }">
          <b-button variant="outline-danger" @click="cancel()">Cancelar</b-button>
          <b-button variant="warning" type="submit" form="handleSubmit">Salvar</b-button>
        </template>
      </b-modal>
    </ContentBar>
    <div class="table-responsive">
      <table class="table text-nowrap">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">E-mail</th>
            <th scope="col">Empresa</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td scope="row">
              {{ client.name }}
              <div class="badges">
                <b-badge
                  v-for="tag in client.tags"
                  :key="tag.id"
                  pill
                  class="mr-1"
                  variant="warning"
                >{{ tag.name }}</b-badge>
              </div>
            </td>
            <td>{{ client.email }}</td>
            <td>{{ client.company }}</td>
            <td>
              <b-button-group>
                <b-button
                  type="button"
                  variant="warning"
                  size="sm"
                  v-b-tooltip.hover.left
                  title="Editar"
                  @click="handleUpdate(client)"
                >
                  <b-icon icon="pencil" />
                </b-button>
                <b-button
                  type="button"
                  variant="danger"
                  size="sm"
                  v-b-tooltip.hover.left
                  title="Remover"
                  @click="handleDestroy(client)"
                >
                  <b-icon icon="trash" />
                </b-button>
              </b-button-group>
            </td>
          </tr>
        </tbody>
      </table>
      <NoData icon="people" :data="countClients" message="Nenhum cliente foi encontrado!" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import ContentBar from "@/components/ContentBar";
import NoData from "@/components/NoData";

export default {
  components: {
    ContentBar,
    NoData
  },
  data() {
    return {
      edit: false,
      client: {
        name: null,
        email: null,
        company: null,
        tags: []
      }
    };
  },
  methods: {
    onReset() {
      this.edit = false;
      this.client = {};
      this.client.name = null;
      this.client.email = null;
      this.client.company = null;
      this.client.tags = [];
    },
    toast(title, message, variant = "success") {
      this.$bvToast.toast(message, {
        title,
        toaster: "b-toaster-top-center",
        solid: true,
        variant,
        appendToast: true
      });
    },
    handleFilter(event) {
      this.$store.dispatch("filterClients", event.target.value);
    },
    handleSubmit() {
      if (this.client.tags.length > 0) {
        if (!this.edit) {
          this.$store.dispatch("storeClient", this.client);
          this.toast("Sucesso", `Cliente ${this.client.name} foi adicionado!`);
        } else {
          this.$store.dispatch("updateClient", this.client);
          this.toast("Sucesso", `Cliente ${this.client.name} foi atualizado!`);
        }
        this.$root.$emit("bv::hide::modal", "modal-form");
      }
    },
    handleUpdate(client) {
      this.edit = true;
      this.client.id = client.id;
      this.client.name = client.name;
      this.client.email = client.email;
      this.client.company = client.company;
      this.client.tags = client.tags.map(t => t.name);
      this.$root.$emit("bv::show::modal", "modal-form");
    },
    handleDestroy(client) {
      if (window.confirm(`Deseja remover o cliente ${client.name}?`)) {
        this.$store.dispatch("destroyClient", client);
        this.toast(
          "Sucesso",
          `Cliente ${client.name} foi removido!`,
          "success"
        );
      }
    }
  },
  computed: {
    ...mapState(["clients"]),
    ...mapGetters(["countClients", "avaliableTags"]),
    options() {
      return this.avaliableTags;
    },
    availableOptions() {
      return this.options.filter(opt => this.client.tags.indexOf(opt) === -1);
    }
  },
  mounted() {
    this.$store.dispatch("loadClients");
    this.$store.dispatch("loadTags", false);
  }
};
</script>
