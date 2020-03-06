<template>
  <div class="auth">
    <transition name="bounce" appear>
      <b-icon icon="person" class="rounded-circle bg-warning p-1 icon" variant="light"></b-icon>
    </transition>
    <b-card>
      <slot />
    </b-card>
  </div>
</template>

<style scoped>
.auth {
  width: 410px;
  text-align: center;
}

.auth .card {
  padding: 15px;
  padding-top: 70px;
}

.auth .icon {
  width: 120px;
  height: 120px;
  position: relative;
  top: calc(120px / 2);
  z-index: 1;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>