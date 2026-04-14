package group3.tgif_backend.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id" , nullable = false)
    private long id;

    @Column(name="name", nullable = false)
    private String name;
    @Column(name="title_en")
    private String titleEn;
    @Column(name = "title_fr")
    private String titleFr;
    @Column (name="bio_en")
    private String bioEn;
    @Column (name="bio_fr")
    private String bioFr;
    @Column(name="image_url")
    private String imageUrl;
    @Embedded
    private SocialLink socialLink;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;


}
