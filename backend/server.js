import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(" User connected:", socket.id);

  //  JOIN ROOM
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined ${room}`);
  });

  //  SEND MESSAGE TO ROOM ONLY
  socket.on("send_message", (data) => {
    // data = { name, message, room }
    io.to(data.room).emit("receive_message", data);
  });

  // TYPING INSIDE ROOM
  socket.on("typing", ({ name, room }) => {
    socket.to(room).emit("show_typing", name);
  });

  socket.on("stop_typing", (room) => {
    socket.to(room).emit("hide_typing");
  });

  socket.on("disconnect", () => {
    console.log(" User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log(" Server running on port 5000");
});