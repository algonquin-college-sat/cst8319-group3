package group3.tgif_backend.DTO;


import group3.tgif_backend.Model.EventType;
import lombok.Data;

@Data
public class EventUpdateData {
    private String title_en;
    private String title_fr;
    private String description_en;
    private String description_fr;
    private String date;
    private String time;
    private String venue_en;
    private String venue_fr;
    private EventType event_type;
    private Double price;
    private String currency;
    private Boolean registration_open;
    private String registration_opens_date;
    private String category_en;
    private String category_fr;
    private String image_url;
}