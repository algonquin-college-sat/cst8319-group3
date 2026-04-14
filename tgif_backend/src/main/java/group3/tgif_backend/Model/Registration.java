package group3.tgif_backend.Model;

import jakarta.persistence.*;
import lombok.*;

import java.time.ZonedDateTime;

@Entity
@Table(name = "registrations",
        uniqueConstraints = @UniqueConstraint(columnNames = {"email", "event_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id; //

    @Column(name = "event_id", nullable = false)
    private Integer eventId; //

    @Column(name = "first_name", nullable = false)
    private String firstName; //

    @Column(name = "last_name", nullable = false)
    private String lastName; //

    @Column(name = "email", nullable = false)
    private String email; //

    @Column(name = "payment_status")
    private String paymentStatus; //

    @Column(name = "created_at", updatable = false, nullable = false)
    private ZonedDateTime createdAt;



    @PrePersist
    public void prePersist() {
        this.createdAt = java.time.ZonedDateTime.now();
    }
}

