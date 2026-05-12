package br.ifsp.educhat.dto.material;

import java.time.LocalDateTime;

import br.ifsp.educhat.model.Chat;
import lombok.Data;

@Data
public class MaterialResponseDTO {
    
    private Long id;
    private String title;
    private String description;
    private Long chatId;
    private String local;
    private LocalDateTime createdAt;
}
