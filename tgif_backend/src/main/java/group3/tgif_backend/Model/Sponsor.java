package group3.tgif_backend.Model;

import jakarta.persistence.*;
import lombok.*;

import java.net.ProtocolFamily;

@Entity
@Table(name="sponsors")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Sponsor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id; //

    @Column(name="name", nullable=false)
    private String name;

    @Column(name="type")
    private String type;
    @Column(name = "desc_en")
    private String descEn;

    @Column(name = "desc_fr")
    private String descFr;

    @Column(name = "image_url")
    private String imageUrl;


}
