package group3.tgif_backend.DTO;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VolunteerDTO {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private String availability;
    private String experience;
    private String reason;
    private String event;

}