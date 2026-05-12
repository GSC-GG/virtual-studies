package br.ifsp.educhat.dto.material;

import java.util.Optional;

import br.ifsp.educhat.model.Chat;
import lombok.Data;

@Data
public class MaterialPatchDTO {
    
    Optional<String> title = Optional.empty();
    Optional<String> description = Optional.empty();
    Optional<Chat> chat = Optional.empty();
    Optional<String> local = Optional.empty();
}
