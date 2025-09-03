let stompClient = null;
let currentUser = "";
let isConnected = false;

function connect() {
  const socket = new SockJS("/chat");
  stompClient = Stomp.over(socket);

  updateConnectionStatus("connecting", "Connecting...");

  stompClient.connect(
    {},
    function (frame) {
      console.log("Connected: " + frame);
      isConnected = true;
      updateConnectionStatus("connected", "Connected");

      // Subscribe to messages
      stompClient.subscribe("/topic/messages", function (message) {
        const messageData = JSON.parse(message.body);
        showMessage(messageData);
      });

      // Enable send button if user has entered name
      const senderInput = document.getElementById("senderInput");
      if (senderInput.value.trim()) {
        document.getElementById("sendMessage").disabled = false;
      }
    },
    function (error) {
      console.error("Connection error: " + error);
      updateConnectionStatus("disconnected", "Connection failed");
      isConnected = false;

      // Try to reconnect after 3 seconds
      setTimeout(connect, 3000);
    }
  );
}

function updateConnectionStatus(status, text) {
  const indicator = document.getElementById("statusIndicator");
  const statusText = document.getElementById("statusText");

  indicator.className = `status-indicator status-${status}`;
  statusText.textContent = text;
}

function showMessage(message) {
  const chat = document.getElementById("chat");

  // Remove welcome message if it exists
  const welcomeMessage = chat.querySelector(".welcome-message");
  if (welcomeMessage) {
    welcomeMessage.remove();
  }

  const messageElement = document.createElement("div");
  const isOwnMessage = message.sender === currentUser;

  messageElement.className = `message ${
    isOwnMessage ? "own-message" : ""
  } new-message`;

  const timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const avatar = getAvatar(message.sender);

  messageElement.innerHTML = `
        <div class="user-avatar">${avatar}</div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-sender">${escapeHtml(
                  message.sender
                )}</span>
                <span class="message-time">${timestamp}</span>
            </div>
            <p class="message-text">${escapeHtml(message.content)}</p>
        </div>
    `;

  chat.appendChild(messageElement);
  chat.scrollTop = chat.scrollHeight;

  // Remove animation class after animation completes
  setTimeout(() => {
    messageElement.classList.remove("new-message");
  }, 300);
}

function getAvatar(name) {
  if (!name) return "?";
  return name.charAt(0).toUpperCase();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function sendMessage() {
  const sender = document.getElementById("senderInput").value.trim();
  const content = document.getElementById("messageInput").value.trim();

  if (!sender) {
    alert("Please enter your name first!");
    document.getElementById("senderInput").focus();
    return;
  }

  if (!content) {
    alert("Please enter a message!");
    document.getElementById("messageInput").focus();
    return;
  }

  if (!isConnected) {
    alert("Not connected to server. Please wait...");
    return;
  }

  // Update current user if changed
  if (currentUser !== sender) {
    currentUser = sender;
  }

  const chatMessage = {
    sender: sender,
    content: content,
    timestamp: new Date().toISOString(),
  };

  stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage));
  document.getElementById("messageInput").value = "";
  document.getElementById("messageInput").focus();

  console.log("Sent message: " + JSON.stringify(chatMessage));
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    if (event.target.id === "senderInput") {
      document.getElementById("messageInput").focus();
    } else if (event.target.id === "messageInput") {
      sendMessage();
    }
  }
}

function validateInputs() {
  const senderInput = document.getElementById("senderInput");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendMessage");

  const hasName = senderInput.value.trim().length > 0;
  const hasMessage = messageInput.value.trim().length > 0;

  sendButton.disabled = !(hasName && hasMessage && isConnected);
}

// Initialize the application
window.onload = function () {
  // Connect to WebSocket
  connect();

  // Set up event listeners
  document.getElementById("sendMessage").onclick = sendMessage;
  document.getElementById("senderInput").onkeypress = handleKeyPress;
  document.getElementById("messageInput").onkeypress = handleKeyPress;

  // Real-time input validation
  document.getElementById("senderInput").oninput = validateInputs;
  document.getElementById("messageInput").oninput = validateInputs;

  // Focus on name input
  document.getElementById("senderInput").focus();

  // Add some helpful tips
  console.log("💬 Modern Chat App loaded successfully!");
  console.log("📝 Enter your name and start chatting");
  console.log("⌨️  Press Enter to send messages quickly");
};

// Handle page visibility changes
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    console.log("Page hidden - connection maintained");
  } else {
    console.log("Page visible - checking connection");
    if (!isConnected) {
      connect();
    }
  }
});

// Handle beforeunload to clean up
window.addEventListener("beforeunload", function () {
  if (stompClient && isConnected) {
    stompClient.disconnect();
  }
});
