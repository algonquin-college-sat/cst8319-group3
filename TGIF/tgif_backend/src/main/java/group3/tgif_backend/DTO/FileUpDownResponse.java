package group3.tgif_backend.DTO;

import lombok.Data;

@Data
public class FileUpDownResponse {
    private String uploadUrl;
    private String downloadUrl;
    private String expiresAt;
}
