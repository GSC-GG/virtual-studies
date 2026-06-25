package br.ifsp.educhat.controller;

import java.security.Principal;

import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import br.ifsp.educhat.dto.message.MessageRequestDTO;
import br.ifsp.educhat.dto.message.MessageResponseDTO;
import br.ifsp.educhat.model.UserAuthenticated;
import br.ifsp.educhat.service.ChatService;

@Controller
public class ChatWebSocketController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatService chatAuthorizationService;

    public ChatWebSocketController(
            ChatService chatService,
            SimpMessagingTemplate messagingTemplate, ChatService chatAuthorizationService) {
        this.chatService = chatService;
        this.messagingTemplate = messagingTemplate;
        this.chatAuthorizationService = chatAuthorizationService;
    }

    @MessageMapping("/chats/{idChat}/messages")
    public void sendMessage(
            @DestinationVariable Long idChat,
            MessageRequestDTO message,
            Principal principal) {

        UserAuthenticated auth = (UserAuthenticated) ((Authentication) principal).getPrincipal();

        Long userId = auth.getUser().getId();

        chatAuthorizationService.userHasAccess(idChat, userId);

        MessageResponseDTO response = chatService.createMessage(idChat, message, auth.getUser());

        messagingTemplate.convertAndSend(
                "/topic/chats/" + idChat,
                response);
    }
}