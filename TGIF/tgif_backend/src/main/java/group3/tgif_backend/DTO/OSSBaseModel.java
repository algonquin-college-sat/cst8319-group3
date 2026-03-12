package group3.tgif_backend.DTO;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class OSSBaseModel {
    @NotBlank(message = "bucket_name cannot be empty")
    @Size(min = 3, max = 63, message = "bucket_name length should be between 3 and 63")
    @Pattern(regexp = "^[a-z0-9-]+$", message = "Invalid bucket name format")
    private String bucketName;
}

