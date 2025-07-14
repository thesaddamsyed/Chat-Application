package com.chat.app.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.chat.app.model.ChatMessage;

@Controller
public class ChatController {

    // This class will handle chat-related requests and WebSocket interactions
    // For example, it can handle sending and receiving messages, managing chat rooms, etc.
    
    // Add methods to handle incoming messages, broadcast messages to users, etc.
    // You can use @MessageMapping to map messages to specific methods
    // and @SendTo to specify where the response should be sent.

    // Example method to send a chat message

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(ChatMessage message) {
        // Logic to send a chat message
        return message; // This is just a placeholder, implement actual logic here
    }

    // You can add more methods to handle different types of messages or actions
    // For example, you can add methods to handle user joining/leaving, private messages,

    // or notifications.
    // You can also add methods to handle chat rooms, user presence, etc.


    // Example method to return the chat view
    // This method can be used to serve the chat page when the user accesses the chat URL
    @GetMapping("/chat")
    public String chat() {
        // Return the name of the chat view (e.g., "chat.html" or "chat.jsp")
        // This will render the chat page where users can send and receive messages
        return "chat";
    }

}
