<template>
  <v-flex xs12>
    <v-text-field
      label="Message"
      placeholder="Enter a message..."
      outlined
      v-model="text"
      @keydown.enter="send"
    >
    </v-text-field>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    text: "",
  }),

  methods: {
    send() {
      this.$socket.emit(
        "createMessage",
        { id: this.$store.state.id, text: this.text },
        (data) => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            this.text = "";
          }
        }
      );
    },
  },
};
</script>
