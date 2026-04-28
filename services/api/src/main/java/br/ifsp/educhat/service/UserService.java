package br.ifsp.educhat.service;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.ifsp.educhat.dto.chat.ChatResponseDTO;
import br.ifsp.educhat.dto.page.PagedResponse;
import br.ifsp.educhat.dto.student.StudentResponseDTO;
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
import br.ifsp.educhat.repository.UserRepository;

@Service
public class UserService {
    private final ChatRepository chatRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final ModelMapper modelMapper;
    private final PagedResponseMapper pagedResponseMapper;

    public UserService(ChatRepository chatRepository, StudentRepository studentRepository, TeacherRepository teacherRepository,
            ModelMapper modelMapper, PagedResponseMapper pagedResponseMapper) {
        this.chatRepository = chatRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.modelMapper = modelMapper;
        this.pagedResponseMapper = pagedResponseMapper;
    }

    public UserResponseDTO createUser(UserRegistrationDTO userDto) {
        if (userDto.isTeacher()) {
            Teacher teacher = modelMapper.map(userDto, Teacher.class);
            Teacher createdTeacher = teacherRepository.save(teacher);
            return modelMapper.map(createdTeacher, UserResponseDTO.class);
        }
        Student student = modelMapper.map(userDto, Student.class);
        Student createdStudent = studentRepository.save(student);
        return modelMapper.map(createdStudent, UserResponseDTO.class);
    }

    public UserResponseDTO getUserById(long id) {
        Teacher teacher = teacherRepository.findById(id)
            .orElse(null);
        Student student = studentRepository.findById(id)
            .orElse(null);
        if (teacher != null) {
            return modelMapper.map(teacher, UserResponseDTO.class);
        }
        if (student != null) {
            return modelMapper.map(student, UserResponseDTO.class);
        }
        throw new ResourceNotFoundException("User not found with id: " + id);
    }
    
    public PagedResponse<ChatResponseDTO> getChats(Long id, Pageable pageable) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        Page<Chat> chatsPage = chatRepository.findByStudentsContaining(student, pageable);
        return pagedResponseMapper.toPagedResponse(chatsPage, ChatResponseDTO.class);
    }
}
