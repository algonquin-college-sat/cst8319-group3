package group3.tgif_backend.Services;

import group3.tgif_backend.DTO.DashboardStats;
import group3.tgif_backend.Repository.EventRepository;
import group3.tgif_backend.Repository.RegistrationRepository;
import group3.tgif_backend.Repository.VolunteerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DashboardService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private VolunteerRepository volunteerRepository;

    public DashboardStats getDashboardStats() {

        long totalEvents = eventRepository.count();
        long totalRegistrations = registrationRepository.count();
        long totalVolunteers = volunteerRepository.count();

        long upcomingEvents = eventRepository.countUpcoming(LocalDate.now().toString());

        return new DashboardStats(
                totalEvents,
                totalRegistrations,
                totalVolunteers,
                upcomingEvents
        );
    }
}
