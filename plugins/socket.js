import Vue from "vue";
import VueSocketIO from "vue-socket.io";

export default function ({ store }) {
  Vue.use(
    new VueSocketIO({
      debug: false,
      connection: "http://localhost:3000", // FIXME: use proxy instead localhost
      vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_",
      },
    })
  );
}
