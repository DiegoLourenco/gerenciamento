<template>
  <div id="app">
    <div class="container">
      <component :is="layout">
        <div class="d-flex justify-content-center" v-if="isLoading">
          <b-spinner style="width: 8em; height: 8em;" label="Loading..." type="grow"></b-spinner>
        </div>
        <router-view v-show="!isLoading"></router-view>
      </component>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    },
    isLoading() {
      return this.$store.getters.isLoading;
    }
  }
};
</script>

<style>
html,
body,
#app,
.container {
  height: 100%;
  background: #e9e9e9;
}

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
