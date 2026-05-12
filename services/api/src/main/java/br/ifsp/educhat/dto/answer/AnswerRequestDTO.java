package br.ifsp.educhat.dto.answer;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AnswerRequestDTO {

    @NotNull
    private Long exerciseId;

    @NotNull
    private Long studentId;

    @NotNull
    private Double grade;
}
