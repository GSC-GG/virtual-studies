package br.ifsp.educhat.dto.user;

import java.time.LocalDateTime;

import br.ifsp.educhat.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {

    @NotNull(message = "Campo 'name' não pode ser nulo")
    @Size(min=2, max=100)
    private String name;

    @NotNull(message = "Campo 'email' não pode ser nulo")
    @Email
    private String email;

    @NotNull(message = "Campo 'password' não pode ser nulo")
    private String password;

    private String role = "student";
    private boolean teacher = false;
    private LocalDateTime createdAt;

    public boolean isTeacher() {
        return "teacher".equalsIgnoreCase(role) || teacher;
    }
}
