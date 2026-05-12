package br.ifsp.educhat.dto.meeting;

import java.time.LocalDateTime;

import br.ifsp.educhat.model.Chat;
import lombok.Data;

@Data
public class MeetingResponseDTO {
    
    private Long id;
    private String title;
    private String description;
    private Long chatId;
    private String link;
    private LocalDateTime date;
    private boolean closed;
    private LocalDateTime createdAt;
}
