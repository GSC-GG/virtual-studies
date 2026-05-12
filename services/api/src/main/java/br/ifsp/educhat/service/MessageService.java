package br.ifsp.educhat.service;

import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import br.ifsp.educhat.dto.message.MessagePatchDTO;
import br.ifsp.educhat.dto.message.MessageResponseDTO;
import br.ifsp.educhat.exceptions.ResourceNotFoundException;
import br.ifsp.educhat.mapper.PagedResponseMapper;
import br.ifsp.educhat.model.Message;
import br.ifsp.educhat.model.Student;
import br.ifsp.educhat.model.Teacher;
import br.ifsp.educhat.model.User;
import br.ifsp.educhat.repository.MessageRepository;
import br.ifsp.educhat.repository.StudentRepository;
import br.ifsp.educhat.repository.TeacherRepository;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final ModelMapper modelMapper;

    public MessageService(MessageRepository messageRepository,
            StudentRepository studentRepository, ModelMapper modelMapper,
            TeacherRepository teacherRepository) {
        this.messageRepository = messageRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.modelMapper = modelMapper;
    }

    public MessageResponseDTO getMessageById(Long id, User user) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found"));
        long idAuthor = message.getAuthor().getId();
        Teacher teacher = teacherRepository.findById(idAuthor)
                .orElse(new Teacher());
        Student student = studentRepository.findById(idAuthor)
                .orElse(new Student());
        if (student.getId() == null && teacher.getId() == null) {
            throw new AccessDeniedException("Access Denied");
        }
        return modelMapper.map(message, MessageResponseDTO.class);
    }

    public MessageResponseDTO updateMessage(Long id, MessagePatchDTO messageDto, User user) {
        Message existingMessage = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with ID: " + id));
        long idAuthor = existingMessage.getAuthor().getId();
        Teacher teacher = teacherRepository.findById(idAuthor)
                .orElse(new Teacher());
        Student student = studentRepository.findById(idAuthor)
                .orElse(new Student());
        if (student.getId() == null && teacher.getId() == null) {
            throw new AccessDeniedException("Access Denied");
        }
        messageDto.getText().ifPresent(text -> existingMessage.setText(text));
        Message updatedMessage = messageRepository.save(existingMessage);
        return modelMapper.map(updatedMessage, MessageResponseDTO.class);
    }

    public void deleteMessage(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with ID: " + id));

        messageRepository.delete(message);
    }
}