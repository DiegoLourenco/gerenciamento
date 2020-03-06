<template>
  <div class="content">
    <ContentBar icon="tag" label="Tag" :counter="countTags" />
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
                >
                  <b-icon icon="pencil" />
                </b-button>
                <b-button
                  type="button"
                  variant="danger"
                  size="sm"
                  v-b-tooltip.hover.left
                  title="Remover"
                  @click="destroy(tag)"
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
  methods: {
    toast(title, message, variant) {
      this.$bvToast.toast(message, {
        title,
        toaster: "b-toaster-top-center",
        solid: true,
        variant,
        appendToast: true
      });
    },
    destroy(tag) {
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
