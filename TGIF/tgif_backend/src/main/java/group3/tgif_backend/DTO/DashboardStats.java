package group3.tgif_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStats {
    private long totalEvents;
    private long totalRegistrations;
    private long totalVolunteers;
    private long upcomingEvents;
}