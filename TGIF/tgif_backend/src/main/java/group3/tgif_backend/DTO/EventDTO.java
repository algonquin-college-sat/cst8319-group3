package group3.tgif_backend.DTO;


import group3.tgif_backend.Model.EventType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventDTO {

    private Long id;

    private String titleEn;
    private String titleFr;

    private String descriptionEn;
    private String descriptionFr;

    private LocalDate eventDate;

    private String location;

    private EventType type;

    private Double price;

    private LocalDate registrationOpenDate;

    private String keynoteSpeaker;

    private String bannerImageUrl;

    private boolean active;
}