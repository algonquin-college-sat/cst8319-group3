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

    @Column(name = "name", nullable = false)
    private String name; //

    @Column(name = "email", nullable = false)
    private String email; //

    @Column(name = "phone")
    private String phone; //

    @Column(name = "role")
    private String role; //

    @Column(name = "availability")
    private String availability;

    @Column(name = "experience")
    private String experience;

    @Column(name = "reason")
    private String reason;

    @Column(name = "created_at")
    private java.time.ZonedDateTime createdAt; //

    @Column(name = "event")
    private String event;

    @PrePersist
    public void prePersist() {
        this.createdAt = java.time.ZonedDateTime.now();
    }

}