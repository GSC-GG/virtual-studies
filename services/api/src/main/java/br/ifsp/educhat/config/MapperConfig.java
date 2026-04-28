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

@Configuration
public class MapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.addMappings(new PropertyMap<Answer, AnswerResponseDTO>() {
            @Override
            protected void configure() {
                map().setExerciseId(source.getExercise().getId());
                map().setStudentId(source.getStudent().getId());
            }
        });
        modelMapper.addMappings(new PropertyMap<Exercise, ExerciseResponseDTO>() {
            @Override
            protected void configure() {
                map().setChatId(source.getChat().getId());
            }
        });
        modelMapper.addMappings(new PropertyMap<Material, MaterialResponseDTO>() {
            @Override
            protected void configure() {
                map().setChatId(source.getChat().getId());
            }
        });
        modelMapper.addMappings(new PropertyMap<Meeting, MeetingResponseDTO>() {
            @Override
            protected void configure() {
                map().setChatId(source.getChat().getId());
            }
        });
        modelMapper.addMappings(new PropertyMap<Thanks, ThanksResponseDTO>() {

            @Override
            protected void configure() {
                map().setMessageId(source.getMessage().getId());
                map().setStudentId(source.getStudent().getId());
            }
        });
        modelMapper.addMappings(new PropertyMap<UserRegistrationDTO, Student>() {
            
            @Override
            protected void configure() {
                map().setCreatedAt(LocalDateTime.now());
                map().setRole(Role.STUDENT);
            }
        });
        modelMapper.addMappings(new PropertyMap<UserRegistrationDTO, Teacher>() {
            
            @Override
            protected void configure() {
                map().setCreatedAt(LocalDateTime.now());
                map().setRole(Role.TEACHER);
            }
        });
        return modelMapper;
    }
}