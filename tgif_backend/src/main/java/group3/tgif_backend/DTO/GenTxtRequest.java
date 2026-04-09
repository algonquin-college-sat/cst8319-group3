package group3.tgif_backend.DTO;

import lombok.Data;

import java.util.List;

@Data
public class GenTxtRequest {
    private List<ChatMessage> messages;
    private String model = "deepseek-v3.2";
    private boolean stream = false;
    private Double temperature = 0.7;
    private Integer maxTokens = 4096;
}
