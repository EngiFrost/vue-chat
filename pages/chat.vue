<template>
  <h1>CHAT PAGE {{ user.name }}</h1>
</template>

<script>
import { mapState } from "vuex";
export default {
  head() {
    return { title: `Room ${this.user.room}` };
  },

  computed: mapState(["user"]),

  middleware: ["chat"],
};
</script>
