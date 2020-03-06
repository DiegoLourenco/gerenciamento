<template>
  <div class="content">
    <ContentBar icon="tag" label="Tag" :counter="countTags">
      <b-icon icon="search" font-scale="2" />
      <input
        class="input-search"
        type="text"
        placeholder="Pesquisa..."
        v-b-tooltip.focus
        title="Pressione Enter para um filtro"
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
      <b-modal id="modal-form" :title="!edit ? 'Adicionar Tag' : 'Editar Tag' " @hidden="onReset">
        <b-form id="handleSubmit" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Nome">
            <b-form-input placeholder="Nome" v-model="tag.name" required />
            {{ tag }}
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
            <th scope="col">Clientes Vínculados</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tag in tags" :key="tag.id">
            <td scope="row">{{ tag.name }}</td>
            <td>{{ tag.clients_count }}</td>
            <td>
              <b-button-group>
                <b-button
                  type="button"
                  variant="warning"
                  size="sm"
                  v-b-tooltip.hover.left
                  title="Editar"
                  @click="handleUpdate(tag)"
                >
                  <b-icon icon="pencil" />
                </b-button>
                <b-button
                  type="button"
                  variant="danger"
                  size="sm"
                  v-b-tooltip.hover.left
                  title="Remover"
                  @click="handleDestroy(tag)"
                >
                  <b-icon icon="trash" />
                </b-button>
              </b-button-group>
            </td>
          </tr>
        </tbody>
      </table>
      <NoData icon="tag" :data="countTags" message="Nenhuma tag foi encontrada!" />
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
      tag: {
        name: null
      }
    };
  },
  methods: {
    toast(title, message, variant = "success") {
      this.$bvToast.toast(message, {
        title,
        toaster: "b-toaster-top-center",
        solid: true,
        variant,
        appendToast: true
      });
    },
    onReset() {
      this.edit = false;
      this.tag = {};
      this.tag.name = null;
    },
    handleFilter(event) {
      this.$store.dispatch("filterTags", event.target.value);
    },
    handleSubmit() {
      if (!this.edit) {
        this.$store.dispatch("storeTag", this.tag);
        this.toast("Sucesso", `A tag ${this.tag.name} foi adicionada`);
      } else {
        this.$store.dispatch("updateTag", this.tag);
        this.toast("Sucesso", `A tag ${this.tag.name} foi atualizada`);
      }
      this.$root.$emit("bv::hide::modal", "modal-form");
    },
    handleUpdate(tag) {
      this.edit = true;
      this.tag.id = tag.id;
      this.tag.name = tag.name;
      this.$root.$emit("bv::show::modal", "modal-form");
    },
    handleDestroy(tag) {
      if (window.confirm(`Deseja remover a tag ${tag.name}?`)) {
        this.$store.dispatch("destroyTag", tag);
        this.toast("Sucesso", `A tag ${tag.name} foi removida`, "success");
      }
    }
  },
  computed: {
    ...mapState(["tags"]),
    ...mapGetters(["countTags"])
  },
  mounted() {
    this.$store.dispatch("loadTags");
  }
};
</script>
