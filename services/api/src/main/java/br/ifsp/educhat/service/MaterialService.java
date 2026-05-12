package br.ifsp.educhat.service;

import org.modelmapper.ModelMapper;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import br.ifsp.educhat.dto.material.MaterialPatchDTO;
import br.ifsp.educhat.dto.material.MaterialResponseDTO;
import br.ifsp.educhat.exceptions.ResourceNotFoundException;
import br.ifsp.educhat.model.Material;
import br.ifsp.educhat.model.Student;
import br.ifsp.educhat.model.Teacher;
import br.ifsp.educhat.model.User;
import br.ifsp.educhat.repository.ChatRepository;
import br.ifsp.educhat.repository.MaterialRepository;
import br.ifsp.educhat.repository.StudentRepository;
import br.ifsp.educhat.repository.TeacherRepository;

@Service
public class MaterialService {
    private final MaterialRepository materialRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final ModelMapper modelMapper;

    public MaterialService(MaterialRepository materialRepository, ModelMapper modelMapper,
            StudentRepository studentRepository, TeacherRepository teacherRepository) {
        this.materialRepository = materialRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.modelMapper = modelMapper;
    }

    public MaterialResponseDTO getMaterialById(Long idMaterial, User user) {
        Student studentPossibleUser = studentRepository.findById(user.getId())
                .orElse(new Student());
        Teacher teacherPossibleUser = teacherRepository.findById(user.getId())
                .orElse(new Teacher());
        if (studentPossibleUser.getId() == null && teacherPossibleUser.getId() == null) {
            throw new AccessDeniedException("Access Denied");
        }
        Material material = materialRepository.findById(idMaterial)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Material not found with ID: " + idMaterial));
        return modelMapper.map(material, MaterialResponseDTO.class);
    }

    public MaterialResponseDTO updateMaterial(Long idMaterial,
            MaterialPatchDTO materialDto,
            User user) {
        Teacher teacherPossibleUser = teacherRepository.findById(user.getId())
                .orElse(new Teacher());
        if (teacherPossibleUser.getId() == null) {
            throw new AccessDeniedException("Access Denied");
        }
        Material existingMaterial = materialRepository.findById(idMaterial)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Material not found with ID: " + idMaterial));
        if (materialDto.getTitle().isPresent())
            existingMaterial.setTitle(materialDto.getTitle().get());
        if (materialDto.getDescription().isPresent())
            existingMaterial.setDescription(materialDto.getDescription().get());
        if (materialDto.getLocal().isPresent())
            existingMaterial.setLocal(materialDto.getLocal().get());
        Material updatedMaterial = materialRepository.save(existingMaterial);
        return modelMapper.map(updatedMaterial, MaterialResponseDTO.class);
    }

    public void deleteMaterial(Long idMaterial, User user) {
        Teacher teacherPossibleUser = teacherRepository.findById(user.getId())
                .orElse(new Teacher());
        Material material = materialRepository.findById(idMaterial)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Material not found with ID: " + idMaterial));
        if (teacherPossibleUser.getId() == null) {
            throw new AccessDeniedException("Access Denied");
        }
        materialRepository.delete(material);
    }
}