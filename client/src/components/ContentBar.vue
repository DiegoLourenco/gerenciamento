<template>
  <div class="d-flex justify-content-between align-items-center flex-sm-row flex-column">
    <div class="subtitle d-flex align-items-center">
      <b-icon :icon="icon" font-scale="2" />
      {{ counter }} {{ label }}(s)
    </div>
    <div class="d-flex align-items-center">
      <b-icon icon="search" font-scale="2" />
      <input class="input-search" type="text" placeholder="Pesquisa..." />

      <button class="btn btn-light btn-sm" v-b-tooltip.hover.left title="Adicionar" type="button">
        <b-icon icon="plus" font-scale="2"></b-icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    label: String,
    counter: Number
  }
};
</script>

<style scoped>
.input-search {
  border: 0;
}
</style>