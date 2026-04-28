package br.ifsp.educhat.service;

import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import br.ifsp.educhat.dto.page.PagedResponse;
import br.ifsp.educhat.dto.student.StudentRequestDTO;
import br.ifsp.educhat.dto.student.StudentResponseDTO;
import br.ifsp.educhat.exceptions.ResourceNotFoundException;
import br.ifsp.educhat.mapper.PagedResponseMapper;
import br.ifsp.educhat.model.Student;
import br.ifsp.educhat.repository.StudentRepository;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final ModelMapper modelMapper;
    private final PagedResponseMapper pagedResponseMapper;
    
    public StudentService(StudentRepository studentRepository, ModelMapper modelMapper, PagedResponseMapper pagedResponseMapper) {
        this.studentRepository = studentRepository;
        this.modelMapper = modelMapper;
        this.pagedResponseMapper = pagedResponseMapper;
    }
    
    public StudentResponseDTO createStudent(StudentRequestDTO studentDto) {
        Student student = modelMapper.map(studentDto, Student.class);
        student.setCreatedAt(LocalDateTime.now());
        Student createdStudent = studentRepository.save(student);
        return modelMapper.map(createdStudent, StudentResponseDTO.class);
    }
    
    public PagedResponse<StudentResponseDTO> getAllStudents(Pageable pageable) {
        Page<Student> studentsPage = studentRepository.findAll(pageable);
        return pagedResponseMapper.toPagedResponse(studentsPage, StudentResponseDTO.class);
    }
    
    public StudentResponseDTO getStudentById(Long id) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        return modelMapper.map(student, StudentResponseDTO.class);
    }
    
    public StudentResponseDTO updateStudent(Long id, StudentRequestDTO studentDto) {
        
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));
        
        modelMapper.map(studentDto, existingStudent);
        existingStudent.setId(id);
        Student updatedStudent = studentRepository.save(existingStudent);
        return modelMapper.map(updatedStudent, StudentResponseDTO.class);
    }
    
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + id));
        
        studentRepository.delete(student);
    }
}