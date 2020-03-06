<template>
  <div v-if="!data > 0" class="d-flex align-items-center flex-column my-4">
    <b-icon :icon="icon" font-scale="4"></b-icon>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    message: String,
    data: Number
  }
};
</script>