<template>
  <div class="wrapper">
    <div class="chat" ref="block">
      <Message
        v-for="message in messages"
        key="message.text"
        :name="message.name"
        :text="message.text"
        :owner="message.id === user.id"
      />
    </div>

    <div class="form">
      <ChatInput />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Message from "../components/Message.vue";
import ChatInput from "~/components/ChatInput.vue";
export default {
  head() {
    return { title: `Room ${this.user.room}` };
  },

  components: {
    Message,
    ChatInput,
  },

  computed: mapState(["user", "messages"]),

  middleware: ["chat"],

  watch: {
    messages() {
      setTimeout(() => {
        // NOTE: investigate why this works!
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}

.chat {
  position: absolute;
  bottom: 80px;
  top: 48px;
  right: 0;
  left: 0;
  padding: 1rem;
  overflow-y: auto;
}

.form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: #212121;
  padding: 1rem;
}
</style>
