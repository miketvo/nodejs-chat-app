const socket = io();
const messageContainer = $("#message-container");
const nameBox = $("#name-box");
const chatBox = $("#chat-box");
const url = window.location.origin;
console.log("Client Javascript running on", url);

$(() => {
  $("#send").click(() => {
    sendMessage({
      socketID: socket.id,
      name: nameBox.val(),
      content: chatBox.val(),
    });
    chatBox.val("");
  });
  getMessages();
});

const updateMessages = data => {
  messageContainer.innerHTML = "";
  if (data.forEach) {
    data.forEach(message => {
      if (message.socketID === socket.id) {
        messageContainer.append(`
          <div class="msg-out">
            <div class="name">${message.name}</div>
            <div class="msg">${message.content}</div>
          </div>`
        );
      } else {
        messageContainer.append(`
          <div class="msg-in">
            <div class="name">${message.name}</div>
            <div class="msg">${message.content}</div>
          </div>`
        );
      }
    });
  } else {
    if (data.socketID === socket.id) {
      messageContainer.append(`
        <div class="msg-out">
          <div class="name">${data.name}</div>
          <div class="msg">${data.content}</div>
        </div>`
      );
    } else {
      messageContainer.append(`
        <div class="msg-in">
          <div class="name">${data.name}</div>
          <div class="msg">${data.content}</div>
        </div>`
      );
    }
  }
}

const getMessages = () => {
  $.get(url + "/messages", data => {
    updateMessages(data);
  });
}

const sendMessage = message => {
  $.post(url + "/messages", message);
}

socket.on("send-message", updateMessages);
