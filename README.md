# 💬 Live Chat Room (Socket.io)

A real-time chat application built using **WebSockets (Socket.io)** with a React frontend and Node.js backend.
This project demonstrates **bidirectional communication**, chat rooms, and live typing indicators — similar to modern messaging apps.

---
## Live link - "https://live-chat-three-chi.vercel.app/"

## 🚀 Features

### ✅ Level 1

* Real-time messaging using WebSockets
* Instant message broadcasting
* No page refresh required

### ✅ Level 2

* User identification (messages show as `[username]: message`)
* Live typing indicator (`User is typing...`)

### ✅ Level 3

* Multiple chat rooms (e.g., General, Tech Support)
* Room-based messaging (messages only visible inside selected room)
* Room-specific typing indicators

---

## 🧠 Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js + Express
* **Real-time Engine:** Socket.io
* **Styling:** CSS (Custom UI)

---


###  Setup Backend

```
cd backend
npm install
npm start
```

Server will run on:

```
http://localhost:5000
```

---

###  Setup Frontend

Open a new terminal:

```
cd frontend
npm install
npm start
```

App will run on:

```
http://localhost:3000
```

---

## 🧪 How to Use

1. Open the app in your browser
2. Enter your **name**
3. Select a **chat room**
4. Start chatting in real-time 

### 👉 Testing Tips

* Open multiple tabs to simulate multiple users
* Join the same room to see messages
* Join different rooms to test isolation

---

## 📡 How It Works

* Uses **WebSockets** instead of HTTP for real-time communication
* Client sends events → Server listens → Broadcasts to clients
* Socket.io handles:

  * Connections
  * Rooms
  * Event-based messaging

---

## 🔥 Key Concepts Covered

* WebSockets vs HTTP
* Real-time bidirectional communication
* Socket.io events (`emit`, `on`)
* Rooms (`join`, `to`)
* Broadcasting messages
* Typing indicators with events

---




