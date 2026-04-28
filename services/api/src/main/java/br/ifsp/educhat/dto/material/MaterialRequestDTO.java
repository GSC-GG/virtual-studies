package br.ifsp.educhat.dto.material;
                
import br.ifsp.educhat.model.Chat;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MaterialRequestDTO {
    
    @NotNull(message = "Campo 'title' não pode ser nulo")
    private String title;
    
    @NotNull(message = "Campo 'description' não pode ser nulo")
    private String description;
    
    @NotNull(message = "Campo 'local' não pode ser nulo")
    private String local;
}
