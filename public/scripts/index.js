const messageContainer = document.getElementById("message-container");
const chat = document.getElementById("chat");
const url = window.location.href;
console.log("Client Javascript running on", url);

window.addEventListener("load", () => {
  updateMessageContainer();
});

chat.addEventListener("submit", e => {
  e.preventDefault();
  sendMessage();
  updateMessageContainer();
});

const updateMessageContainer = () => {
  let messages = [];
  getMessages(res => {
    messages = res;
  });
  console.log(messages);

  messageContainer.innerHTML = "";
  messages.forEach((message) => {
    const msg = document.createElement("div");
    const name = document.createElement("div").appendChild(document.createTextNode(message.name));
    const content = document.createElement("div").appendChild(document.createTextNode(message.content));
    msg.appendChild(name);
    msg.appendChild(content);
    messageContainer.appendChild(msg);
  });
}

const getMessages = (response) => {
  const XHR = new XMLHttpRequest();
  XHR.onreadystatechange = () => {
    if (XHR.readyState === 4 && XHR.status === 200)
      response(XHR.responseText);
  }
  XHR.open("GET", url + "all-messages/", true);
  XHR.send(null);
}

const sendMessage = () => {
  const XHR = new XMLHttpRequest()
  const FD  = new FormData(chat);

  console.log(FD);

  XHR.addEventListener( "load", () => {
    console.log("Send Message: Data sent and response loaded");
  });
  XHR.addEventListener("error", () => {
    console.log("Send Message: Oops! Something went wrong.");
  });

  XHR.open("POST", url);
  XHR.send(FD);
}
