$(function() {
    var socket = io()
});

$("#sendTweet").submit(function() {
    let content = $("#tweet").val();
    socket.emit("tweet", {content: content});
    $("#tweet").val("");
    return false;
});

socket.on("incomingTweets", function(data) {
    console.log(data);
}) 