package br.ifsp.educhat.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import br.ifsp.educhat.dto.message.MessageRequestDTO;
import br.ifsp.educhat.dto.message.MessageResponseDTO;
import br.ifsp.educhat.service.ChatService;

@Controller
public class ChatWebSocketController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    public ChatWebSocketController(
            ChatService chatService,
            SimpMessagingTemplate messagingTemplate) {

        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chats/{idChat}/messages")
    public void sendMessage(
            @DestinationVariable Long idChat,
            MessageRequestDTO message) {

        System.out.println("Received");

        MessageResponseDTO response =
                chatService.createMessage(idChat, message);

        messagingTemplate.convertAndSend(
                "/topic/chats/" + idChat,
                response
        );
    }
}