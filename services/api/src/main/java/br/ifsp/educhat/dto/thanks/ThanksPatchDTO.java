package br.ifsp.educhat.dto.thanks;

import java.util.Optional;

import br.ifsp.educhat.model.Student;
import lombok.Data;

@Data
public class ThanksPatchDTO {

    private Optional<String> message;
    private Optional<Student> student;
}
