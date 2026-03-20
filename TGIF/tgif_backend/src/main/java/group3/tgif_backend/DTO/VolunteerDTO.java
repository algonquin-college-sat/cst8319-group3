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
    private String userId;
    private Long eventId;

    private String name;
    private String email;
    private String phone;
    private String role;

    private LocalDateTime createdAt;
}