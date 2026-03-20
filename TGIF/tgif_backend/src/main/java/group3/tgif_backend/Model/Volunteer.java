package group3.tgif_backend.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "volunteers")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Volunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id; //

    @Column(name = "user_id", nullable = false)
    private String userId; //

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


    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;
}