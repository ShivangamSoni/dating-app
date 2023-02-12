const socket = require("socket.io");
const { verify } = require("jsonwebtoken");

let io;

exports.createSocket = function (server) {
    io = socket(server, {
        cors: { origin: "*" },
    });

    // Connect if Authenticated
    io.use((socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            const token = socket.handshake.query.token;
            try {
                const payload = verify(token, process.env.JWT_KEY);
                socket.payload = payload;
                next();
            } catch {}
        }
    });

    io.on("connection", (socket) => {
        socket.on("setup", (client) => {
            const sub = socket.payload.sub;
            // Subscribe to User Specific Channel
            socket.join(sub);
        });
    });
};

exports.sendNotification = function (channelId, notification) {
    io.to(channelId).emit("notification", notification);
};
