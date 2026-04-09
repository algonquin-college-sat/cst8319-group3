package group3.tgif_backend.DTO;

import lombok.Data;
import java.util.List;

@Data
public class BatchDeleteRequest {
    private List<Integer> ids;
}
