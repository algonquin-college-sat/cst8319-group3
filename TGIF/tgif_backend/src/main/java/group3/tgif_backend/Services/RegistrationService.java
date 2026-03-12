package group3.tgif_backend.Services;

import group3.tgif_backend.DTO.RegistrationDTO;
import group3.tgif_backend.Model.Event;
import group3.tgif_backend.Model.Registration;
import group3.tgif_backend.Repository.EventRepository;
import group3.tgif_backend.Repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;

    public RegistrationDTO register(RegistrationDTO dto) {

        if (registrationRepository.existsByEmailAndEventId(dto.getEmail(), dto.getEventId())) {
            throw new RuntimeException("User already registered for this event");
        }

        Event event = eventRepository.findById(dto.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Registration registration = Registration.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .event(event)
                .build();

        return mapToDTO(registrationRepository.save(registration));
    }

    public List<RegistrationDTO> getRegistrationsByEvent(Long eventId) {
        return registrationRepository.findByEventId(eventId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private RegistrationDTO mapToDTO(Registration r) {
        return RegistrationDTO.builder()
                .id(r.getId())
                .firstName(r.getFirstName())
                .lastName(r.getLastName())
                .email(r.getEmail())
                .eventId(r.getEvent().getId())
                .build();
    }
}

