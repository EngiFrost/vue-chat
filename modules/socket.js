import { Server } from "socket.io";
import { defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook("listen", (server) => {
      const io = new Server(server, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"],
          transports: ["websocket"],
          credentials: true,
        },
        allowEIO3: true,
      });

      nuxt.hook("close", () => io.close());

      io.on("connection", (socket) => {
        console.log("CONNECTION");

        socket.on("createMessage", (data) => {
          setTimeout(() => { // NOTE: async imitation
            socket.emit("getMessage", { text: data.text + " SERVER" });
          }, 1500);
        });
      });
    });
  },
});
