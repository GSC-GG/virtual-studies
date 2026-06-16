package br.ifsp.educhat.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import br.ifsp.educhat.exceptions.ResourceNotFoundException;
import br.ifsp.educhat.model.User;
import br.ifsp.educhat.repository.UserRepository;

@Service
public class AuthenticationService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    
    public AuthenticationService(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    
    public String authenticate(Authentication authentication) {
        String email = authentication.getName();     
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return jwtService.generateToken(user);
    }
}
