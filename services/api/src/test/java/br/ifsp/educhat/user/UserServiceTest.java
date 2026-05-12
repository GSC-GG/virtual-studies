package br.ifsp.educhat.user;

import static org.junit.jupiter.api.Assertions.assertNotNull;
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

import br.ifsp.educhat.dto.user.UserRegistrationDTO;
import br.ifsp.educhat.dto.user.UserResponseDTO;
import br.ifsp.educhat.exceptions.ResourceNotFoundException;
import br.ifsp.educhat.mapper.PagedResponseMapper;
import br.ifsp.educhat.model.Chat;
import br.ifsp.educhat.model.Student;
import br.ifsp.educhat.model.Teacher;
import br.ifsp.educhat.model.User;
import br.ifsp.educhat.repository.ChatRepository;
import br.ifsp.educhat.repository.StudentRepository;
import br.ifsp.educhat.repository.TeacherRepository;
import br.ifsp.educhat.service.UserService;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    
    @Mock
    private StudentRepository studentRepository;

    @Mock
    private TeacherRepository teacherRepository;

    @Mock
    private ChatRepository chatRepository;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private PagedResponseMapper pagedResponseMapper;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldCreateStudent() {
        UserRegistrationDTO dto = new UserRegistrationDTO();
        dto.setName("John Doe");
        dto.setEmail("john.doe@hotmail.com");
        dto.setPassword("John.1234");

        Student userEntity = new Student();
        Student savedUser = new Student();
        savedUser.setId(1L);
        savedUser.setName("John Doe");

        when(modelMapper.map(dto, Student.class)).thenReturn(userEntity);
        when(studentRepository.save(any())).thenReturn(savedUser);
        when(modelMapper.map(savedUser, UserResponseDTO.class)).thenReturn(new UserResponseDTO());

        UserResponseDTO response = userService.createUser(dto);
        assertNotNull(response);
    }

    @Test
    void shouldCreateTeacher() {
        UserRegistrationDTO dto = new UserRegistrationDTO();
        dto.setName("Jane Doe");
        dto.setEmail("jane.doe@hotmail.com");
        dto.setPassword("Jane.1234");
        dto.setTeacher(true);

        Teacher userEntity = new Teacher();
        Teacher savedUser = new Teacher();
        savedUser.setId(1L);
        savedUser.setName("Jane Doe");

        when(modelMapper.map(dto, Teacher.class)).thenReturn(userEntity);
        when(teacherRepository.save(any())).thenReturn(savedUser);
        when(modelMapper.map(savedUser, UserResponseDTO.class)).thenReturn(new UserResponseDTO());

        UserResponseDTO response = userService.createUser(dto);
        assertNotNull(response);
    }

    @Test
    void shouldFetchUser() {
        long id = 1L;
        Student student = new Student();
        Teacher teacher = new Teacher();
        student.setId(id);
        teacher.setId(id);

        when(studentRepository.findById(id)).thenReturn(Optional.of(student));
        when(teacherRepository.findById(id)).thenReturn(Optional.of(teacher));
        when(modelMapper.map(any(), eq(UserResponseDTO.class))).thenReturn(new UserResponseDTO());

        UserResponseDTO response = userService.getUserById(id);
        assertNotNull(response);
    }

    @Test
    void shouldNotFindUser() {
        long id = 999L;

        assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(id));
    }
}
