package group3.tgif_backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import group3.tgif_backend.Model.EventType;
import lombok.Data;

@Data
public class EventData {
    @JsonProperty("title_en") private String titleEn;
    @JsonProperty("title_fr") private String titleFr;
    @JsonProperty("description_en") private String descriptionEn;
    @JsonProperty("description_fr") private String descriptionFr;
    private String date;
    private String time;
    @JsonProperty("venue_en") private String venueEn;
    @JsonProperty("venue_fr") private String venueFr;
    @JsonProperty("event_type") private EventType eventType;
    private Float price;
    private String currency;
    @JsonProperty("registration_open") private Boolean registrationOpen;
    @JsonProperty("registration_opens_date") private String registrationOpensDate;
    @JsonProperty("category_en") private String categoryEn;
    @JsonProperty("category_fr") private String categoryFr;
    @JsonProperty("image_url") private String imageUrl;
}