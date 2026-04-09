package group3.tgif_backend.Services;

import group3.tgif_backend.DTO.GenTxtRequest;
import group3.tgif_backend.DTO.GenTxtResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class AIHubService {

    private final WebClient webClient;

    public AIHubService(@Value("${app.ai.base-url}") String baseUrl,
                        @Value("${app.ai.key}") String apiKey) {
        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .build();
    }

    public Mono<GenTxtResponse> genTxt(GenTxtRequest request) {
        return webClient.post()
                .uri("/chat/completions")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(GenTxtResponse.class);
    }
}