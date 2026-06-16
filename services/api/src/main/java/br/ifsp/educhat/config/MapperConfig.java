package br.ifsp.educhat.config;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import br.ifsp.educhat.dto.answer.AnswerResponseDTO;
import br.ifsp.educhat.dto.chat.ChatResponseDTO;
import br.ifsp.educhat.dto.exercise.ExerciseResponseDTO;
import br.ifsp.educhat.dto.material.MaterialResponseDTO;
import br.ifsp.educhat.dto.message.MessagePatchDTO;
import br.ifsp.educhat.dto.message.MessageResponseDTO;
import br.ifsp.educhat.dto.meeting.MeetingResponseDTO;
import br.ifsp.educhat.dto.thanks.ThanksResponseDTO;
import br.ifsp.educhat.dto.user.UserRegistrationDTO;
import br.ifsp.educhat.model.*;
import org.modelmapper.Converter;

@Configuration
public class MapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.createTypeMap(Answer.class, AnswerResponseDTO.class)
                .addMappings(mapper -> {
                    mapper.map(
                            src -> src.getExercise().getId(),
                            AnswerResponseDTO::setExerciseId);

                    mapper.map(
                            src -> src.getStudent().getId(),
                            AnswerResponseDTO::setStudentId);
                });
        modelMapper.createTypeMap(Exercise.class, ExerciseResponseDTO.class)
                .addMappings(mapper -> {
                    mapper.map(
                        src -> src.getChat().getId(),
                        ExerciseResponseDTO::setChatId);
                });
        modelMapper.createTypeMap(Material.class, MaterialResponseDTO.class)
                .addMappings(mapper -> {
                    mapper.map(
                        src -> src.getChat().getId(),
                        MaterialResponseDTO::setChatId);
                });
        modelMapper.createTypeMap(Meeting.class, MeetingResponseDTO.class)
                .addMappings(mapper -> {
                    mapper.map(
                        src -> src.getChat().getId(),
                        MeetingResponseDTO::setChatId);
                });
        modelMapper.createTypeMap(Thanks.class, ThanksResponseDTO.class)
                .addMappings(mapper -> {
                    mapper.map(
                        src -> src.getMessage().getId(),
                        ThanksResponseDTO::setMessageId);
                    mapper.map(
                        src -> src.getStudent().getId(),
                        ThanksResponseDTO::setStudentId);
                });
        // Conversor de Role enum para String
        Converter<Role, String> roleToString = ctx -> ctx.getSource() == null ? null : ctx.getSource().name().toLowerCase();
        modelMapper.addConverter(roleToString);

        modelMapper.createTypeMap(UserRegistrationDTO.class, Student.class)
                .addMappings(mapper -> {
                    mapper.using((ctx) -> {
                        String roleStr = (String) ctx.getSource();
                        return Role.fromString(roleStr);
                    }).map(UserRegistrationDTO::getRole, Student::setRole);
                });
        modelMapper.createTypeMap(UserRegistrationDTO.class, Teacher.class)
                .addMappings(mapper -> {
                    mapper.using((ctx) -> {
                        String roleStr = (String) ctx.getSource();
                        return Role.fromString(roleStr);
                    }).map(UserRegistrationDTO::getRole, Teacher::setRole);
                });
        // modelMapper.addMappings(new PropertyMap<UserRegistrationDTO, Teacher>() {
            
        //     @Override
        //     protected void configure() {
        //         map().setCreatedAt(source.getCreatedAt());
        //         map().setRole(source.getRole());
        //     }
        // });
        return modelMapper;
    }
}