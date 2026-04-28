package br.ifsp.educhat.chat;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;

import br.ifsp.educhat.dto.chat.ChatRequestDTO;
import br.ifsp.educhat.dto.chat.ChatResponseDTO;
import br.ifsp.educhat.exceptions.ResourceNotFoundException;
import br.ifsp.educhat.mapper.PagedResponseMapper;
import br.ifsp.educhat.model.Chat;
import br.ifsp.educhat.model.Student;
import br.ifsp.educhat.model.Teacher;
import br.ifsp.educhat.repository.ChatRepository;
import br.ifsp.educhat.repository.StudentRepository;
import br.ifsp.educhat.repository.TeacherRepository;
import br.ifsp.educhat.repository.UserRepository;
import br.ifsp.educhat.service.ChatService;
import jakarta.validation.ConstraintViolationException;

@ExtendWith(MockitoExtension.class)
public class ChatServiceTest {

    @Mock
    private ChatRepository chatRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TeacherRepository teacherRepository;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private PagedResponseMapper pagedResponseMapper;

    @InjectMocks
    private ChatService chatService;

    @Test
    void shouldCreateChat() {
        ChatRequestDTO dto = new ChatRequestDTO();
        dto.setSubject("Biologia");

        Teacher teacher = new Teacher();
        long id = 1L;
        teacher.setId(id);
        teacher.setName("Jane Doe");
        teacher.setEmail("jane.doe@outlook.com");
        teacher.setPassword("Bio1234");

        when(teacherRepository.findById(id)).thenReturn(Optional.of(teacher));
        when(modelMapper.map(any(), eq(ChatResponseDTO.class))).thenReturn(new ChatResponseDTO());

        ChatResponseDTO response = chatService.createChat(dto, teacher);
        assertNotNull(response);
    }

    @Test
    void shouldDenyAccessWhenTeacherInexistent() {
        ChatRequestDTO dto = new ChatRequestDTO();
        dto.setSubject("Biologia");

        Teacher teacher = new Teacher();

        assertThrows(AccessDeniedException.class, () -> chatService.createChat(dto, teacher));
    }

    @Test
    void shouldFetchChat() {
        long id = 1L;
        Chat chat = new Chat();
        chat.setId(id);

        when(chatRepository.findById(id)).thenReturn(Optional.of(chat));
        when(modelMapper.map(chat, ChatResponseDTO.class)).thenReturn(new ChatResponseDTO());

        ChatResponseDTO response = chatService.getChatById(id);
        assertNotNull(response);
    }

    @Test
    void shouldNotFindChat() {
        long id = 999L;

        assertThrows(ResourceNotFoundException.class, () -> chatService.getChatById(id));
    }
}
