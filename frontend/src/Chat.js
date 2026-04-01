import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  const typingTimeout = useRef(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on("show_typing", (name) => {
      setTypingUser(name);
    });

    socket.on("hide_typing", () => {
      setTypingUser("");
    });

    return () => {
      socket.off("receive_message");
      socket.off("show_typing");
      socket.off("hide_typing");
    };
  }, []);

  // JOIN CHAT WITH ROOM
  const joinChat = () => {
    if (name && room) {
      socket.emit("join_room", room);
      setJoined(true);
    }
  };

  //  SEND MESSAGE
  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", {
      name,
      message,
      room,
    });

    setMessage("");
    socket.emit("stop_typing", room);
  };

  //  TYPING HANDLER
  const handleTyping = (e) => {
  const value = e.target.value;
  setMessage(value);

  if (!room || !name) return;

  socket.emit("typing", { name, room });

  if (typingTimeout.current) clearTimeout(typingTimeout.current);

  typingTimeout.current = setTimeout(() => {
    socket.emit("stop_typing", room);
  }, 1000);
};

  if (!joined) {
    return (
      <div className="join-container">
        <h2>Join Chat</h2>

        <input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />

        <select onChange={(e) => setRoom(e.target.value)}>
          <option value="">Select Room</option>
          <option value="General">General</option>
          <option value="Tech">Tech Support</option>
        </select>

        <button onClick={joinChat}>Join</button>
      </div>
    );
  }

 
  return (
  <div className="chat-container">
    
    <div className="chat-header">
      Room: {room}
    </div>

    <div className="chat-box">
      {chat.map((msg, index) => (
        <div
          key={index}
          className={`message ${
            msg.name === name ? "my-message" : "other-message"
          }`}
        >
          <div className="username">{msg.name}</div>
          <div>{msg.message}</div>
        </div>
      ))}
    </div>

    {typingUser && typingUser !== name && (
      <div className="typing">{typingUser} is typing...</div>
    )}

    <div className="chat-input">
      <input
        value={message}
        onChange={handleTyping}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>

  </div>
);
}

export default Chat;