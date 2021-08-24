const messageContainer = $("#message-container");
const url = window.location.origin;
console.log("Client Javascript running on", url);

$(() => {
  $("#send").click(() => {
    sendMessage({
      name: $("#name-box").val(),
      content: $("#chat-box").val(),
    });
  });
  getMessages();
});

const updateMessages = messages => {
  messageContainer.innerHTML = "";
  messages.forEach(message => {
    messageContainer.append(`
      <div class="msg-in">
        <div class="name">${message.name}</div>
        <div class="msg">${message.content}</div>
      </div>`
    );
  });
}

const getMessages = () => {
  $.get(url + "/messages", messages => {
    updateMessages(messages);
  });
}

const sendMessage = message => {
  $.post(url + "/messages", message);
}
