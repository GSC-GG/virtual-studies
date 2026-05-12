package br.ifsp.educhat.dto.thanks;

import java.time.LocalDateTime;

import br.ifsp.educhat.model.Message;
import br.ifsp.educhat.model.Student;
import lombok.Data;

@Data
public class ThanksResponseDTO {

    private Long id;
    private Long messageId;
    private Long studentId;
    private LocalDateTime createdAt;
}
