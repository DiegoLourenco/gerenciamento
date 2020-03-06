<template>
  <b-form @submit.prevent="handleSubmit">
    <b-form-group>
      <b-form-input
        id="email"
        name="email"
        type="email"
        placeholder="E-mail"
        trim
        size="lg"
        required
        v-model="user.email"
      />
    </b-form-group>
    <b-form-group>
      <b-form-input
        id="password"
        name="password"
        type="password"
        placeholder="Senha"
        trim
        size="lg"
        required
        v-model="user.password"
      />
    </b-form-group>
    <b-button type="submit" variant="warning" block size="lg">Entrar</b-button>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      user: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.user);
    }
  }
};
</script>
