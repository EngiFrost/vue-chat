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

          socket.join(data.room); // NOTE: subscribed to a specific channel
          cb({ userId: socket.id });
          socket.emit(
            "newMessage",
            convertToObject("admin", `Welcome to the chat, ${data.name}!`)
          );
          socket.emit(
            "newMessage",
            convertToObject("TEST", `Welcome to the chat, buddy!`)
          );
          socket.broadcast // NOTE: emitting an event for all room members except sender
            .to(data.room)
            .emit(
              "newMessage",
              convertToObject("admin", `User ${data.name} joined`)
            );
        });
      });
    });
  },
});

const convertToObject = (name, text, id) => ({ name, text, id });
