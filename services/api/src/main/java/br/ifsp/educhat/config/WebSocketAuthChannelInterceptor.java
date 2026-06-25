package br.ifsp.educhat.config;

import java.security.Principal;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;

import br.ifsp.educhat.model.UserAuthenticated;
import br.ifsp.educhat.security.CustomJwtAuthenticationConverter;
import br.ifsp.educhat.service.JwtService;

@Component
public class WebSocketAuthChannelInterceptor implements ChannelInterceptor {

    private final JwtDecoder jwtDecoder;
    private final CustomJwtAuthenticationConverter converter;

    public WebSocketAuthChannelInterceptor(
            JwtDecoder jwtDecoder,
            CustomJwtAuthenticationConverter converter) {

        this.jwtDecoder = jwtDecoder;
        this.converter = converter;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (accessor == null)
            return message;

        System.out.println("COMMAND = " + accessor.getCommand());

        if (StompCommand.CONNECT.equals(accessor.getCommand())) {

            String authHeader = accessor.getFirstNativeHeader("Authorization");

            if (authHeader != null && authHeader.startsWith("Bearer ")) {

                String token = authHeader.substring(7);
                Jwt jwt = jwtDecoder.decode(token);
                AbstractAuthenticationToken authentication = converter.convert(jwt);

                accessor.setUser(authentication);
                accessor.getSessionAttributes()
                        .put("SPRING.USER", authentication);

                System.out.println("USER SET ON CONNECT = " + authentication);
            }
        }

        // reforça usuário na mesma sessão pra todo comando
        if (accessor.getUser() == null
                && accessor.getSessionAttributes() != null) {

            Authentication auth = (Authentication) accessor.getSessionAttributes().get("SPRING.USER");

            if (auth != null) {
                accessor.setUser(auth);
            }
        }

        System.out.println("USER (FINAL) = " + accessor.getUser());

        return message;
    }
}