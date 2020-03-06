<template>
  <div class="d-flex justify-content-between align-items-center flex-sm-row flex-column">
    <div class="subtitle d-flex align-items-center">
      <b-icon :icon="icon" font-scale="2" />
      {{ counter }} {{ label }}(s)
    </div>
    <div class="d-flex align-items-center">
      <slot />
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