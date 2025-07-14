# Real-Time Chat Application

This is a simple real-time chat application built with Spring Boot, WebSocket (STOMP over SockJS), and a Bootstrap frontend. It allows users to send and receive messages instantly in a chat room.

## Features

- Real-time messaging using WebSocket
- Simple and clean Bootstrap UI
- User can set their name and send messages
- Messages are broadcast to all connected users

## Technologies Used

- Java (Spring Boot)
- Spring WebSocket (STOMP)
- SockJS & STOMP.js (frontend)
- Bootstrap 5

## Getting Started

### Prerequisites

- Java 17 or later
- Maven

### Running the Application

1. Clone the repository:
   ```sh
   git clone https://github.com/thesaddamsyed/Chat-Application.git
   cd your-repo
   ```
2. Build and run the app:
   ```sh
   mvn spring-boot:run
   ```
3. Open your browser and go to [http://localhost:8080/chat](http://localhost:8080/chat)

### Usage

- Enter your name in the input field.
- Type a message and click "Send".
- All messages will appear in the chat window for all connected users.

## Project Structure

- `src/main/java/com/chat/app/` - Java source code
  - `controller/ChatController.java` - Handles chat endpoints and WebSocket messaging
  - `model/ChatMessage.java` - Chat message model
  - `config/WebSocketConfig.java` - WebSocket/STOMP configuration
- `src/main/resources/templates/chat.html` - Chat UI
- `src/main/resources/static/js/script.js` - Frontend logic for WebSocket connection

## License

This project is licensed under the MIT License.
