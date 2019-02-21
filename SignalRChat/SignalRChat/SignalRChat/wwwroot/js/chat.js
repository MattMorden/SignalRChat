"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

/* TODO: Move messages from me to the left and messages from others to the right. */
/* Grab Username from the logged in section of identity server, and check if user is same as the sending user, 
    then push the css to float left or right.*/
// Handle receiving messages
connection.on("ReceiveMessage", function (user, message, colour) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + ': ' + msg;
    var li = document.createElement("li");
    //li.textContent = encodedMsg;
    var boldElement = document.createElement("b");
    boldElement.textContent = encodedMsg;
    li.appendChild(boldElement);
    $(li).addClass('col-xs-12');

    //Select the user, check if its the same as the one being sent from the message. 
    //If it is, float to the left. Otherwise, float to the right.
    var userName = document.getElementById("userInput").value;
    if (userName === user) {
        $(boldElement).css('float', 'left');
    }
    else {
        $(boldElement).css('float', 'right');
    }
    $(boldElement).css('background-color', colour);
    //$(li).css('background-color', colour);
    document.getElementById("messagesList").appendChild(li);
});

//For another connection method
connection.on("ActionEventNumber2", function (param1, param2) {
    var msg = param1 + param2;
    var li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("messagesList").appendChild(li);
});

// Handle connection
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

// Handle send button
document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    var colour = document.getElementById("colourInput").value;
    connection.invoke("SendMessage", user, message, colour).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});



