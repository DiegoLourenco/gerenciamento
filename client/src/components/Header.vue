<template>
  <b-navbar>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="font-weight-bold">
        <router-link class="nav-link" to="clients">
          <b-icon icon="people" />Clientes
        </router-link>
        <router-link class="nav-link" to="tags">
          <b-icon icon="tag" />Tags
        </router-link>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-button type="button" variant="light">
          <b-icon icon="box-arrow-right" />
        </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>