package group3.tgif_backend.Model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.time.ZonedDateTime;

@Entity
@Table(name = "users")
@Getter @Setter
public class User {
    @Id
    @Column(name = "id", length = 255)
    private String id; // Matches String(255) primary key

    @Column(name = "email", nullable = false, length = 255)
    private String email; // Matches nullable=False

    @Column(name = "name", length = 255)
    private String name; // Matches nullable=True

    @Column(name = "role", nullable = false, length = 50)
    private String role = "user"; // Matches default="user"

    @CreationTimestamp
    @Column(name = "created_at")
    private ZonedDateTime createdAt; // Matches server_default=func.now()

    @Column(name = "last_login")
    private ZonedDateTime lastLogin; // Matches nullable=True
}
