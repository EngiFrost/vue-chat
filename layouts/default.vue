<template>
  <!-- app prop applies block to app layout -->
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer">
      <v-list subheader>
        <v-subheader>Users in room</v-subheader>

        <v-list-item v-for="u in users" :key="u.id" @click.prevent>
          <!-- <v-list-item-avatar> // TODO:
            <v-img :alt="`${chat.title} avatar`" :src="chat.avatar"></v-img>
          </v-list-item-avatar> -->

          <v-list-item-content>
            <v-list-item-title v-text="u.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="u.id === user.id ? 'primary' : 'grey'">
              mdi-message-outline
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="main-wrapper">
      <v-toolbar dense>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-btn icon @click="leave">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title> Chat room {{ user.room }} </v-toolbar-title>
      </v-toolbar>

      <div>
        <nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    drawer: true,
  }),

  computed: mapState(["user", "users"]),

  methods: {
    ...mapMutations(["clearData"]),

    leave() {
      this.$socket.emit("userLeft", this.user.id, () => {
        this.$router.push("/?message=leftChat");
        this.clearData();
      });
    },
  },
};
</script>

<style scoped>
.main-wrapper {
  height: 100vh;
}
</style>
