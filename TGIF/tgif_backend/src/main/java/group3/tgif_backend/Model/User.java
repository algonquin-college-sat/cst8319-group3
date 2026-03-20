package group3.tgif_backend.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.ZonedDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @Column(name = "id", length = 255)
    private String id; // Primary key

    @Column(name = "email", nullable = false, length = 255, unique = true)
    private String email;

    // ✅ Added password for authentication
    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "role", nullable = false, length = 50)
    private String role = "user";

    @CreationTimestamp
    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @Column(name = "last_login")
    private ZonedDateTime lastLogin;
}