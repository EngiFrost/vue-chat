import { Server } from "socket.io";
import { defineNuxtModule } from "@nuxt/kit";
import users from "../api/users";

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

          users.remove(socket.id);
          users.add({
            id: socket.id,
            name: data.name,
            room: data.room,
          });

          cb({ userId: socket.id });
          socket.emit(
            "newMessage",
            convertToObject("admin", `Welcome to the chat, ${data.name}!`)
          );

          socket.broadcast // NOTE: emitting an event for all room members except sender
            .to(data.room)
            .emit(
              "newMessage",
              convertToObject("admin", `User ${data.name} joined`)
            );
        });

        socket.on("createMessage", (data, cb) => {
          if (!data.text) {
            return cb("Message text is required");
          }

          const user = users.get(data.id);

          if (user) {
            io.to(user.room).emit(
              "newMessage",
              convertToObject(user.name, data.text, data.id)
            );
          }

          cb();
        });

        socket.on("userLeft", (id, cb) => {
          const user = users.remove(id);

          if (user) {
            io.to(user.room).emit(
              "newMessage",
              convertToObject("admin", `User ${user.name} left`)
            );
          }

          cb();
        });

        socket.on("disconnect", () => {
          const user = users.remove(socket.id);

          if (user) {
            io.to(user.room).emit(
              "newMessage",
              convertToObject("admin", `User ${user.name} left`)
            );
          }
        });
      });
    });
  },
});

const convertToObject = (name, text, id) => ({ name, text, id });
