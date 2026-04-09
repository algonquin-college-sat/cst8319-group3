package group3.tgif_backend.Services;

import group3.tgif_backend.DTO.FileUpDownRequest;
import group3.tgif_backend.DTO.FileUpDownResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
public class StorageService {

    @Autowired
    private RestTemplate restTemplate; // Configured with your OSS_API_KEY headers

    public FileUpDownResponse getUploadUrl(FileUpDownRequest request) {
        String endpoint = "/api/v1/infra/client/oss/objects/upload";
        try {
            // Logic matches your Python self._apost_oss_service
            return restTemplate.postForObject(endpoint, request, FileUpDownResponse.class);
        } catch (Exception e) {
            log.error("Failed to generate upload URL: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "OSS Service Error");
        }
    }
}