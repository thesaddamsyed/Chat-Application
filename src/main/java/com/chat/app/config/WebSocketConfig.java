package com.chat.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Configure the message broker to use a simple in-memory broker
        // and set the prefix for application destinations
        // This allows messages to be sent to specific topics

        registry.enableSimpleBroker("/topic");
        // This enables a simple in-memory message broker
        // that will route messages to subscribers of the specified topic
        // For example, messages sent to "/topic/messages" will be broadcast to all
        // subscribers of that topic
        // Set the prefix for messages that are sent to the server
        // and then routed to specific controllers or services
        // This prefix is used for messages that are sent to the server
        // and then routed to specific controllers or services
        // For example, messages sent to "/app/sendMessage" will be handled by the
        // ChatController
        registry.setApplicationDestinationPrefixes("/app");

    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Use allowedOriginPatterns with wildcard to avoid credentials + "*" error
        registry.addEndpoint("/chat").setAllowedOriginPatterns("*").withSockJS();
    }

}
