package br.ifsp.educhat.dto.answer;

import br.ifsp.educhat.model.Exercise;
import br.ifsp.educhat.model.Student;
import lombok.Data;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerPatchDTO {

    private Optional<Exercise> exercise;
    private Optional<Student> student;
    private Optional<Double> grade;
}
