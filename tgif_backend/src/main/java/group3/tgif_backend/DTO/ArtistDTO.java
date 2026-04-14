package group3.tgif_backend.DTO;

import group3.tgif_backend.Model.SocialLink;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArtistDTO {

    private long id;

    private long eventId;

    private String name;

    private String titleEn;

    private String titleFr;

    private String bioEn;

    private String bioFr;

    private String imageUrl;

    private SocialLink socialLink;


}
