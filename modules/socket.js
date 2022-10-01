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
        socket.on("userJoined", (data, cb) => {
          if (!data.name || !data.room) {
            // TODO: use typescript or move validation out
            return cb("Invalid data");
          }

          cb({ userId: socket.id });
          socket.emit(
            "newMessage",
            convertToObject("admin", `Welcome to the chat, ${data.name}!`)
          );
        });
      });
    });
  },
});

const convertToObject = (name, text, id) => ({ name, text, id });
