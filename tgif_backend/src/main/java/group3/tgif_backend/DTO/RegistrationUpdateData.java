package group3.tgif_backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RegistrationUpdateData {

    @JsonProperty("first_name") private String firstName;
    @JsonProperty("last_name") private String lastName;
    private String email;
    private String paymentStatus;  // ✅ only admin/system updates this

}
