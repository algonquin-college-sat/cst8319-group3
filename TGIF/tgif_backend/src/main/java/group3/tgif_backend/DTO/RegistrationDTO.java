package group3.tgif_backend.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistrationDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Long eventId;
}
