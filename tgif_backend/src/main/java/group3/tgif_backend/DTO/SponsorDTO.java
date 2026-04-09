package group3.tgif_backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SponsorDTO {
    private String name;
    private String type;
    @JsonProperty("desc_en") private String descEn;
    @JsonProperty("desc_fr") private String decFr;
    @JsonProperty("image_url") private String imageUrl;

}
