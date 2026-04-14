package group3.tgif_backend.DTO;
import lombok.Data;


@Data
public class GenImgRequest {
    private String prompt;
    private Object image; // Supports String or List<String>
    private String model = "gemini-2.5-flash-image";
    private String size = "1024x1024";
    private String quality = "standard";
    private int n = 1;
}
