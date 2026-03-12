package group3.tgif_backend.Services;

import group3.tgif_backend.Model.Volunteer;
import group3.tgif_backend.Repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
public class VolunteerService {
    @Autowired
    private VolunteerRepository volunteersRepository;

    public Volunteer create(Volunteer volunteer, String userId) {
        volunteer.setUserId(userId);
        if (volunteer.getCreatedAt() == null) {
            volunteer.setCreatedAt(ZonedDateTime.now());
        }
        return volunteersRepository.save(volunteer);
    }
}
