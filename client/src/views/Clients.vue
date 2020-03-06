<template>
  <div class="content">
    <ContentBar icon="people" label="Cliente" :counter="countClients" />
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
          <tr>
            <td scope="row">
              Diego da Silva Lourenço
              <div class="badges">
                <b-badge pill class="mr-1" variant="warning">Badge</b-badge>
              </div>
            </td>
            <td>diego.silva147@gmail.com</td>
            <td>Conselho Federal de Psicologia</td>
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
                >
                  <b-icon icon="trash" />
                </b-button>
              </b-button-group>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ContentBar from "@/components/ContentBar";

export default {
  components: {
    ContentBar
  },
  computed: {
    ...mapGetters(["countClients"])
  },
  mounted() {
    this.$store.dispatch("loadClients");
  }
};
</script>
