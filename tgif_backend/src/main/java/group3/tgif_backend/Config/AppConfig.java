package group3.tgif_backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {

    /**
     * This defines the 'RestTemplate' bean that StorageService is looking for.
     * Spring will now see this and @Autowired it into your services.
     */
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
