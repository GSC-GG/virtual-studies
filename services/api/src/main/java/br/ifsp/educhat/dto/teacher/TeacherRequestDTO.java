package br.ifsp.educhat.dto.teacher;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TeacherRequestDTO {

    @NotNull(message = "Campo 'name' não pode ser nulo")
    private String name;

    @NotNull(message = "Campo 'email' não pode ser nulo")
    private String email;

    @NotNull(message = "Campo 'password' não pode ser nulo")
    private String password;
}
