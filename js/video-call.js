const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Danh sách user và socketId
const users = new Map();

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Lắng nghe sự kiện đăng ký userId
    socket.on("register", (userId) => {
        users.set(userId, socket.id);
        console.log(`User registered: ${userId} -> ${socket.id}`);
    });

    // Lắng nghe khi gửi tín hiệu (offer, answer, candidate)
    socket.on("signal", ({ targetUserId, data }) => {
        const targetSocketId = users.get(targetUserId);
        if (targetSocketId) {
            io.to(targetSocketId).emit("signal", data);
        }
    });

    // Xử lý khi user ngắt kết nối
    socket.on("disconnect", () => {
        for (const [userId, socketId] of users.entries()) {
            if (socketId === socket.id) {
                users.delete(userId);
                console.log(`User disconnected: ${userId}`);
                break;
            }
        }
    });
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
