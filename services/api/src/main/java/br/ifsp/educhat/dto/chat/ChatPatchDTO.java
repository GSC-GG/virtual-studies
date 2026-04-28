package br.ifsp.educhat.dto.chat;

import java.util.Optional;
import java.util.Set;

import br.ifsp.educhat.model.Student;
import br.ifsp.educhat.model.Teacher;
import lombok.Data;

@Data
public class ChatPatchDTO {
    
    Optional<String> subject = Optional.empty();
}
