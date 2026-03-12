package group3.tgif_backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.time.ZonedDateTime;

@Data
public class RegistrationData {
    @JsonProperty("event_id") private Integer eventId;
    @JsonProperty("first_name") private String firstName;
    @JsonProperty("last_name") private String lastName;
    private String email;
    @JsonProperty("payment_status") private String paymentStatus;
    @JsonProperty("created_at") private ZonedDateTime createdAt;
}
