package br.ifsp.educhat.dto.message;

import br.ifsp.educhat.model.Chat;
import br.ifsp.educhat.model.User;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MessageRequestDTO {

    @NotNull(message = "Campo 'text' não pode ser nulo")
    private String text;
}
