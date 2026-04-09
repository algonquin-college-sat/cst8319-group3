package group3.tgif_backend.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GenTxtResponse {

    // In your Python file, this was: content: str
    private String content;

    // In your Python file, this was: model: str
    private String model;

    // Optional: If your Python schema included usage stats or finish reasons
    private Usage usage;

    @Data
    public static class Usage {
        private int promptTokens;
        private int completionTokens;
        private int totalTokens;
    }
}
