package br.ifsp.educhat.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ifsp.educhat.dto.chat.ChatResponseDTO;
import br.ifsp.educhat.dto.page.PagedResponse;
import br.ifsp.educhat.dto.user.UserRegistrationDTO;
import br.ifsp.educhat.dto.user.UserResponseDTO;
import br.ifsp.educhat.model.UserAuthenticated;
import br.ifsp.educhat.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @Operation(summary = "Register user")
    @RequestMapping("/register")
    @PostMapping
    public ResponseEntity<UserResponseDTO> registerUser(@Valid @RequestBody UserRegistrationDTO user) {
        System.out.println(user);
        UserResponseDTO userResponseDTO = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponseDTO);
    }

    @RequestMapping("/{id}")
    @GetMapping
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        UserResponseDTO userResponseDTO = userService.getUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(userResponseDTO);
    }

    @GetMapping("/{idUser}/chats")
    public ResponseEntity<PagedResponse<ChatResponseDTO>> listChats(@PathVariable Long idUser,
            Pageable pageable) {
        return ResponseEntity.ok(userService.getChats(idUser, pageable));
    }

    @Operation(summary = "Get authenticated user info")
    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getAuthenticatedUser(
            @AuthenticationPrincipal UserAuthenticated authentication) {
        return ResponseEntity.ok(userService.getUserById(authentication.getUser().getId()));
    }

    @GetMapping("/me/chats")
    public ResponseEntity<PagedResponse<ChatResponseDTO>> listAuthenticatedUserChats(
            @AuthenticationPrincipal UserAuthenticated authentication,
            Pageable pageable) {
        return ResponseEntity.ok(userService.getAuthenticatedUserChats(authentication.getUser(), pageable));
    }
}
