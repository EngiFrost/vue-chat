<template>
  <v-layout column justify-center align-center>
    <v-flex sx12 sm8>
      <v-card min-width="400" class="mt-13">
        <v-card-title>
          <h2>Nuxt chat</h2>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Name"
              required
            >
            </v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Room number"
              required
            ></v-text-field>

            <v-btn :disabled="!valid" class="mr-4" @click="submit"> Enter room </v-btn>
          </v-form>
        </v-card-text>

        <v-snackbar v-model="snackbar" :timeout="6000" top>
          {{ message }}

          <template v-slot:action="{ attrs }">
            <v-btn color="primary" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  layout: "empty",

  head: { title: "Authentication" },

  sockets: {
    connect() {
      console.log("socket connected");
    },
  },

  data: () => ({
    valid: true,
    snackbar: false,
    message: "",
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 16) || "Name must be less than 16 characters",
    ],
    room: "",
    roomRules: [
      (v) => !!v || "Room number is required",
      (v) => (v && v.length <= 6) || "Room number must be less than 6 digits",
      (v) => (v && !isNaN(+v)) || "Room number must contain only digits",
    ],
  }),

  mounted() {
    const { message } = this.$route.query;
    console.log(this.$route.query);

    if (message === "noUser") {
      this.message = "No user provided. Please, log in";
    }

    if (message === "leftChat") {
      this.message = "You successfully left the chat";
    }

    this.snackbar = !!this.message;
  },

  methods: {
    ...mapMutations(["setUser"]),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room,
        };

        this.$socket.emit("userJoined", user, (data) => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            user.id = data.userId;
            this.setUser(user);
            this.$router.push("/chat");
          }
        });
      }
    },
  },
};
</script>
