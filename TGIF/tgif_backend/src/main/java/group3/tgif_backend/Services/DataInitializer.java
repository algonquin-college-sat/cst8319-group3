package group3.tgif_backend.Services;

import group3.tgif_backend.Repository.EventRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class DataInitializer implements CommandLineRunner {
    @Autowired
    private EventRepository eventsRepository;

    @Override
    public void run(String... args) throws Exception {
        if (eventsRepository.count() == 0) {
            log.info("🔧 No events found. Loading mock data...");
            // Logic here to read your .json files and save them to the DB 1:1
        }
    }
}