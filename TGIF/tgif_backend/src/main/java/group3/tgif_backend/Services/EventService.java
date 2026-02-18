package group3.tgif_backend.Services;


import group3.tgif_backend.DTO.EventDTO;
import group3.tgif_backend.Model.Event;
import group3.tgif_backend.Repository.EventRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<EventDTO> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<EventDTO> getUpcomingEvents() {
        return eventRepository
                .findByActiveTrueAndEventDateGreaterThanEqual(LocalDate.now())
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public EventDTO getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        return mapToDTO(event);
    }

    public EventDTO createEvent(EventDTO dto) {
        Event event = mapToEntity(dto);
        return mapToDTO(eventRepository.save(event));
    }

    public EventDTO updateEvent(Long id, EventDTO dto) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setTitleEn(dto.getTitleEn());
        event.setTitleFr(dto.getTitleFr());
        event.setDescriptionEn(dto.getDescriptionEn());
        event.setDescriptionFr(dto.getDescriptionFr());
        event.setEventDate(dto.getEventDate());
        event.setLocation(dto.getLocation());
        event.setType(dto.getType());
        event.setPrice(dto.getPrice());
        event.setRegistrationOpenDate(dto.getRegistrationOpenDate());
        event.setKeynoteSpeaker(dto.getKeynoteSpeaker());
        event.setBannerImageUrl(dto.getBannerImageUrl());
        event.setActive(dto.isActive());

        return mapToDTO(eventRepository.save(event));
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    private EventDTO mapToDTO(Event event) {
        return EventDTO.builder()
                .id(event.getId())
                .titleEn(event.getTitleEn())
                .titleFr(event.getTitleFr())
                .descriptionEn(event.getDescriptionEn())
                .descriptionFr(event.getDescriptionFr())
                .eventDate(event.getEventDate())
                .location(event.getLocation())
                .type(event.getType())
                .price(event.getPrice())
                .registrationOpenDate(event.getRegistrationOpenDate())
                .keynoteSpeaker(event.getKeynoteSpeaker())
                .bannerImageUrl(event.getBannerImageUrl())
                .active(event.isActive())
                .build();
    }

    private Event mapToEntity(EventDTO dto) {
        return Event.builder()
                .titleEn(dto.getTitleEn())
                .titleFr(dto.getTitleFr())
                .descriptionEn(dto.getDescriptionEn())
                .descriptionFr(dto.getDescriptionFr())
                .eventDate(dto.getEventDate())
                .location(dto.getLocation())
                .type(dto.getType())
                .price(dto.getPrice())
                .registrationOpenDate(dto.getRegistrationOpenDate())
                .keynoteSpeaker(dto.getKeynoteSpeaker())
                .bannerImageUrl(dto.getBannerImageUrl())
                .active(dto.isActive())
                .build();
    }
}