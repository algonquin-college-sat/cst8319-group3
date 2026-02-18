package group3.tgif_backend.Model;

import group3.tgif_backend.Model.EventType;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titleEn;
    private String titleFr;

    @Column(length = 2000)
    private String descriptionEn;

    @Column(length = 2000)
    private String descriptionFr;

    private LocalDate eventDate;
    private String location;

    @Enumerated(EnumType.STRING)
    private EventType type;

    private Double price;

    private LocalDate registrationOpenDate;

    private String keynoteSpeaker;
    private String bannerImageUrl;

    private boolean active;
}