package group3.tgif_backend.Model;

import group3.tgif_backend.Model.EventType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "event")
@Getter
@Setter
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id; //

    @Column(name = "title_en", nullable = false)
    private String titleEn; //

    @Column(name = "title_fr", nullable = false)
    private String titleFr; //

    @Column(name = "description_en")
    private String descriptionEn; //

    @Column(name = "description_fr")
    private String descriptionFr; //

    @Column(name = "date", nullable = false)
    private String date; //

    @Column(name = "time", nullable = false)
    private String time; //

    @Column(name = "venue_en")
    private String venueEn; //

    @Column(name = "venue_fr")
    private String venueFr; //

    @Column(name = "event_type", nullable = false)
    private EventType eventType; //

    @Column(name = "price")
    private Float price; //

    @Column(name = "currency")
    private String currency; //

    @Column(name = "registration_open")
    private Boolean registrationOpen; //

    @Column(name = "registration_opens_date")
    private String registrationOpensDate; //

    @Column(name = "category_en")
    private String categoryEn; //

    @Column(name = "category_fr")
    private String categoryFr; //

    @Column(name = "image_url")
    private String imageUrl; //

}