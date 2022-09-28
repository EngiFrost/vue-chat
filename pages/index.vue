<template>
  <v-layout column justify-center align-center>
    <v-flex sx12 sm8 md6>
      <v-btn @click="emit">Emit message!</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  sockets: {
    connect() {
      console.log("socket connected");
    },
  },

  methods: {
    emit() {
      this.$socket.emit("createMessage", { text: "Message emitted by user" });
    },
  },
};
</script>
