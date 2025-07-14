package com.chat.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer    {

    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Configure the message broker to use a simple in-memory broker
        // and set the prefix for application destinations
        // This allows messages to be sent to specific topics

        registry.enableSimpleBroker("/topic"); 
        // This enables a simple in-memory message broker
        // that will route messages to subscribers of the specified topic
        // For example, messages sent to "/topic/messages" will be broadcast to all subscribers of that topic
        // Set the prefix for messages that are sent to the server
        // and then routed to specific controllers or services
        // This prefix is used for messages that are sent to the server
        // and then routed to specific controllers or services
        // For example, messages sent to "/app/sendMessage" will be handled by the ChatController
        registry.setApplicationDestinationPrefixes("/app");




        // registry.setUserDestinationPrefix("/user");
        // // This prefix is used for user-specific destinations
        // // For example, messages sent to "/user/{username}/queue/messages" will be routed to a specific user
        // // This is useful for private messages or notifications
        // registry.setPreservePublishOrder(true);
        // // This ensures that messages are processed in the order they are received
        // registry.setPreservePublishOrder(true);
        // // This is useful for maintaining the order of messages in a chat application
        // registry.setHeartbeatValue(new long[]{10000, 10000});
        // // This sets the heartbeat interval for WebSocket connections
        // // It helps to keep the connection alive and detect disconnections
        // registry.setAutoStartup(true);
        // // This enables the automatic startup of the WebSocket message broker
        // registry.setTaskScheduler(new DefaultHeartbeatScheduler());
        // // This sets a custom task scheduler for handling heartbeats
        // registry.setUserDestinationTimeout(10000);
        // // This sets the timeout for user destination messages
        // registry.setPreservePublishOrder(true);
        // // This ensures that messages sent to user destinations are processed in the order they are received

    }


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chats").setAllowedOrigins("http://localhost:8080").withSockJS();
    }
    

    
}
