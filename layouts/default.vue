<template>
  <!-- app prop applies block to app layout -->
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer"> </v-navigation-drawer>

    <v-main>
      <v-toolbar app dense>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-btn icon @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title> Chat room {{ user.room }} </v-toolbar-title>
      </v-toolbar>

      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    drawer: true,
  }),

  computed: mapState(["user"]),

  methods: {
    back() {},
  },
};
</script>
