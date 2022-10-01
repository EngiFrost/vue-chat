<template>
  <v-layout column justify-center align-center>
    <v-flex sx12 sm8>
      <v-card min-width="400" class="mt-10">
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
