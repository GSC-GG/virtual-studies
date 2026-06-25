package br.ifsp.educhat.service;

import org.springframework.stereotype.Service;

import br.ifsp.educhat.model.Chat;
import br.ifsp.educhat.model.Student;
import br.ifsp.educhat.model.Teacher;
import br.ifsp.educhat.model.User;
import br.ifsp.educhat.repository.ChatRepository;
import br.ifsp.educhat.repository.UserRepository;

@Service
public class ChatAuthorizationService {

    private final UserRepository userRepository;
    private final ChatRepository chatRepository;

    public ChatAuthorizationService(UserRepository userRepository,
                                     ChatRepository chatRepository) {
        this.userRepository = userRepository;
        this.chatRepository = chatRepository;
    }

    public boolean userHasAccess(Long chatId, Long userId) {

        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user instanceof Teacher teacher) {
            return chat.getTeacher().getId().equals(teacher.getId());
        }

        if (user instanceof Student student) {
            return chat.getStudents()
                    .stream()
                    .anyMatch(s -> s.getId().equals(student.getId()));
        }

        return false;
    }
}