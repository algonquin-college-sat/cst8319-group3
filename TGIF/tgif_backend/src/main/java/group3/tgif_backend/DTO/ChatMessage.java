package group3.tgif_backend.DTO;

import lombok.Data;

@Data
public class ChatMessage {
    private String role;

    // Handles Union[str, List[ContentPart]]
    private Object content;
}
