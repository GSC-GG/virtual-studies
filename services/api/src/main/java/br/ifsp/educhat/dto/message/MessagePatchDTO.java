package br.ifsp.educhat.dto.message;

import java.util.Optional;

import br.ifsp.educhat.model.Chat;
import br.ifsp.educhat.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessagePatchDTO {

    Optional<String> text = Optional.empty();
}
