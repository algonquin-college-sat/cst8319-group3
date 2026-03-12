package group3.tgif_backend.Services;

import group3.tgif_backend.DTO.EventData;
import group3.tgif_backend.Model.Event;
import group3.tgif_backend.Repository.EventRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getList(int skip, int limit) {
        // Simplified pagination to match Python logic
        return eventRepository.findAll().stream().skip(skip).limit(limit).toList();
    }

    public Optional<Event> getById(Integer id) {
        return eventRepository.findById(id);
    }

    @Transactional
    public Event create(EventData data) {
        Event event = new Event();
        updateEntityFromDto(event, data);
        return eventRepository.save(event);
    }

    @Transactional
    public Optional<Event> update(Integer id, EventData data) {
        return eventRepository.findById(id).map(event -> {
            // Partial Update Logic: Only update if field in DTO is not null
            if (data.getTitleEn() != null) event.setTitleEn(data.getTitleEn());
            if (data.getTitleFr() != null) event.setTitleFr(data.getTitleFr());
            if (data.getDescriptionEn() != null) event.setDescriptionEn(data.getDescriptionEn());
            if (data.getDescriptionFr() != null) event.setDescriptionFr(data.getDescriptionFr());
            if (data.getDate() != null) event.setDate(data.getDate());
            if (data.getTime() != null) event.setTime(data.getTime());
            if (data.getVenueEn() != null) event.setVenueEn(data.getVenueEn());
            if (data.getVenueFr() != null) event.setVenueFr(data.getVenueFr());
            if (data.getEventType() != null) event.setEventType(data.getEventType());
            if (data.getPrice() != null) event.setPrice(data.getPrice());
            if (data.getCurrency() != null) event.setCurrency(data.getCurrency());
            if (data.getRegistrationOpen() != null) event.setRegistrationOpen(data.getRegistrationOpen());
            if (data.getRegistrationOpensDate() != null) event.setRegistrationOpensDate(data.getRegistrationOpensDate());
            if (data.getCategoryEn() != null) event.setCategoryEn(data.getCategoryEn());
            if (data.getCategoryFr() != null) event.setCategoryFr(data.getCategoryFr());
            if (data.getImageUrl() != null) event.setImageUrl(data.getImageUrl());

            return eventRepository.save(event);
        });
    }

    @Transactional
    public boolean delete(Integer id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private void updateEntityFromDto(Event event, EventData data) {
        event.setTitleEn(data.getTitleEn());
        event.setTitleFr(data.getTitleFr());
        event.setDescriptionEn(data.getDescriptionEn());
        event.setDescriptionFr(data.getDescriptionFr());
        event.setDate(data.getDate());
        event.setTime(data.getTime());
        event.setVenueEn(data.getVenueEn());
        event.setVenueFr(data.getVenueFr());
        event.setEventType(data.getEventType());
        event.setPrice(data.getPrice());
        event.setCurrency(data.getCurrency());
        event.setRegistrationOpen(data.getRegistrationOpen());
        event.setRegistrationOpensDate(data.getRegistrationOpensDate());
        event.setCategoryEn(data.getCategoryEn());
        event.setCategoryFr(data.getCategoryFr());
        event.setImageUrl(data.getImageUrl());
    }
}