package br.ifsp.educhat.dto.answer;

import java.time.LocalDateTime;

import br.ifsp.educhat.model.Exercise;
import br.ifsp.educhat.model.Student;
import lombok.Data;

@Data
public class AnswerResponseDTO {

    private Long id;
    private Long exerciseId;
    private Long studentId;
    private Double grade;
    private LocalDateTime createdAt;
}
