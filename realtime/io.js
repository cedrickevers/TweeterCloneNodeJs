module.exports = function(io) {
    io.on("connection", function(socket) {
        console.log("connected");
        let user = socket.request.user;
        console.log(user.name)
    })
}