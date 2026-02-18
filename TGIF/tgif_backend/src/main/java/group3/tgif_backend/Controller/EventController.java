package group3.tgif_backend.Controller;



import group3.tgif_backend.DTO.EventDTO;
import group3.tgif_backend.Services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
public class EventController {

    private final EventService eventService;

    // Public
    @GetMapping("/events")
    public List<EventDTO> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/events/upcoming")
    public List<EventDTO> getUpcomingEvents() {
        return eventService.getUpcomingEvents();
    }

    @GetMapping("/events/{id}")
    public EventDTO getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    // Admin (secure later)
    @PostMapping("/admin/events")
    public EventDTO createEvent(@RequestBody EventDTO dto) {
        return eventService.createEvent(dto);
    }

    @PutMapping("/admin/events/{id}")
    public EventDTO updateEvent(@PathVariable Long id,
                                @RequestBody EventDTO dto) {
        return eventService.updateEvent(id, dto);
    }

    @DeleteMapping("/admin/events/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }
}
