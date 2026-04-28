package br.ifsp.educhat.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.ifsp.educhat.model.User;
import br.ifsp.educhat.model.UserAuthenticated;
import br.ifsp.educhat.repository.UserRepository;

@Service
public class UserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    private UserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return new UserAuthenticated(user);
    }
}