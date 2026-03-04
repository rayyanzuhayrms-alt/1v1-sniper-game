const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

let players = [];

wss.on("connection", (ws) => {
  players.push(ws);

  ws.on("message", (msg) => {
    players.forEach(player => {
      if (player !== ws) {
        player.send(msg);
      }
    });
  });

  ws.on("close", () => {
    players = players.filter(player => player !== ws);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
