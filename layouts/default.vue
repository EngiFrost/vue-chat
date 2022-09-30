<template>
  <!-- app prop applies block to app layout -->
  <v-app app dark>
    <v-navigation-drawer app v-model="drawer">
      <v-list subheader>
        <v-subheader>Users in room</v-subheader>

        <v-list-item v-for="user in users" :key="user.id" @click.prevent>
          <!-- <v-list-item-avatar> // TODO:
            <v-img :alt="`${chat.title} avatar`" :src="chat.avatar"></v-img>
          </v-list-item-avatar> -->

          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="user.id === 2 ? 'primary' : 'grey'">
              mdi-message-outline
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-toolbar dense>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-btn icon @click="leave">
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
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({
    drawer: true,
    users: [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
      { id: 3, name: "User 3" },
    ],
  }),

  computed: mapState(["user"]),

  methods: {
    ...mapMutations(["clearData"]),

    leave() {
      this.$router.push("/?message=leftChat");
      this.clearData();
    },
  },
};
</script>
