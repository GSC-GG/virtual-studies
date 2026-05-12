package br.ifsp.educhat.dto.exercise;

import java.util.Optional;

import br.ifsp.educhat.model.Chat;
import lombok.Data;

@Data
public class ExercisePatchDTO {
    
    Optional<String> title = Optional.empty();
    Optional<String> description = Optional.empty();
    Optional<String> link = Optional.empty();
}
