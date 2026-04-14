package group3.tgif_backend.Controller;

import group3.tgif_backend.DTO.EventData;
import group3.tgif_backend.Model.Event;
import group3.tgif_backend.Services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/event")
@CrossOrigin
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public List<Event> list(@RequestParam(defaultValue = "0") int skip,
                            @RequestParam(defaultValue = "20") int limit) {
        return eventService.getList(skip, limit);
    }

    @GetMapping("/{id}")
    public Event get(@PathVariable Long id) {
        return eventService.getById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/new")
    public Event create(@RequestBody EventData data) {
        return eventService.create(data);
    }

    @PutMapping("/{id}")
    public Event update(@PathVariable Long id, @RequestBody EventData data) {
        return eventService.update(id, data)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable Long id) {
        if (!eventService.delete(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Event deleted successfully");
        response.put("id", id);
        return response;
    }

    @PostMapping("/batch-delete")
    public Map<String, Object> batchDelete(@RequestBody Map<String, List<Long>> payload) {
        List<Long> ids = payload.get("ids");
        int count = 0;
        for (Long id : ids) {
            if (eventService.delete(id)) count++;
        }
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Successfully deleted " + count + " events");
        response.put("deleted_count", count);
        return response;
    }
}