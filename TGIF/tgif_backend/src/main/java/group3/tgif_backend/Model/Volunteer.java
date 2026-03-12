package group3.tgif_backend.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "volunteers")
@Getter
@Setter
public class Volunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id; //

    @Column(name = "user_id", nullable = false)
    private String userId; //

    @Column(name = "event_id", nullable = false)
    private Integer eventId; //

    @Column(name = "name", nullable = false)
    private String name; //

    @Column(name = "email", nullable = false)
    private String email; //

    @Column(name = "phone")
    private String phone; //

    @Column(name = "role")
    private String role; //

    @Column(name = "created_at")
    private java.time.ZonedDateTime createdAt; //
}