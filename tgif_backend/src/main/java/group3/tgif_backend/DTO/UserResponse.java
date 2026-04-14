package group3.tgif_backend.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponse {
    private String id; // UUID as String [cite: 51]
    private String email;
    private String name;
    private String role = "user";
    private LocalDateTime lastLogin;
}
