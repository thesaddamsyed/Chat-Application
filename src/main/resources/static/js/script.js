    function connect() {
        // Connect to the WebSocket server using SockJS and Stomp
        var socket = new SockJS('/chat'); // Adjust the endpoint as necessary
        stompClient = Stomp.over(socket); // Create a Stomp client over the SockJS connection
        stompClient.connect({}, function (frame) { // Callback after connection is established
            console.log('Connected: ' + frame); // Log connection success
            // Subscribe to the '/topic/messages' topic to receive messages
            stompClient.subscribe('/topic/messages', function (message) {
                // Parse the received message and call showMessage to display it
                console.log('Received message: ' + message.body); // Log the received message
                showMessage(JSON.parse(message.body));// Display the message using showMessage function
            });
        }   );
    }

    function showMessage(message) {
        // select the message element
        var chat = document.getElementById('chat');
        // Create a new Div element for the message
        var messageElement = document.createElement('div');
        // Set the text content of the message element
        messageElement.textContent = message.sender + ': ' + message.content; // Set the sender and content of the message
        messageElement.className = "border-bottom mb-1"; // Add a class for styling (optional)
        // Append the message element to the chat container
        chat.appendChild(messageElement); // Add the new message to the chat display
        chat.scrollTop = chat.scrollHeight; // Scroll to the bottom of the chat to show the latest message
    }

    function sendMessage() {
        var sender = document.getElementById('senderInput').value; // Get the sender's name from the input field
        var content = document.getElementById('messageInput').value; // Get the message content from the input field
        // Create a message object with sender and content
        var chatMessage = {
            sender: sender,
            content: content
        };
        // Send the message to the '/app/chat' endpoint using Stomp 
        stompClient.send("/app/sendMessage", {}, JSON.stringify(chatMessage)); // Send the message as a JSON string
        document.getElementById('messageInput').value = ''; // Clear the message input field after sending
        document.getElementById('messageInput').focus(); // Focus back on the message input field for convenience
        console.log('Sent message: ' + JSON.stringify(chatMessage)); // Log the sent message for debugging
    }


    window.onload = function () {
    connect(); // Establish WebSocket connection

    // Only run this after DOM is ready
    document.getElementById('sendMessage').onclick = sendMessage;
};


