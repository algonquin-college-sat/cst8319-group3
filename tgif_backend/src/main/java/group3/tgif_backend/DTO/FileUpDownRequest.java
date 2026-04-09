package group3.tgif_backend.DTO;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.io.File;
import java.util.regex.Pattern;

@Data
public class FileUpDownRequest {

    @NotBlank(message = "bucket_name cannot be empty")
    @Size(min = 3, max = 63)
    private String bucketName;

    @NotBlank(message = "object_key cannot be empty")
    private String objectKey;

    /**
     * Logic matching Python's @field_validator("object_key")
     * re.sub(r"[^A-Za-z0-9._-]", "-", base_name)
     */
    public void setObjectKey(String v) {
        if (v == null || v.trim().isEmpty()) {
            this.objectKey = v;
            return;
        }

        // 1:1 Logic: Get basename (os.path.basename)
        String baseName = new File(v.trim()).getName();

        // 1:1 Logic: Replace invalid chars with '-'
        String safeKey = baseName.replaceAll("[^A-Za-z0-9._-]", "-");

        // 1:1 Logic: Length check
        if (safeKey.length() > 255) {
            throw new IllegalArgumentException("object_key too long");
        }

        this.objectKey = safeKey;
    }
}
