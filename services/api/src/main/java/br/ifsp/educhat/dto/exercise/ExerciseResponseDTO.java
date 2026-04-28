package br.ifsp.educhat.dto.exercise;

import java.time.LocalDateTime;

import br.ifsp.educhat.model.Chat;
import lombok.Data;

@Data
public class ExerciseResponseDTO {
    
    private Long id;
    private String title;
    private String description;
    private Long chatId;
    private String link;
    private LocalDateTime createdAt;
}
