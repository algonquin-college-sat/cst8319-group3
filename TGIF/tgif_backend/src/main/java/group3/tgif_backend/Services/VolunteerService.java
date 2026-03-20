package group3.tgif_backend.Services;

import group3.tgif_backend.DTO.VolunteerDTO;
import group3.tgif_backend.Model.Event;
import group3.tgif_backend.Model.Volunteer;
import group3.tgif_backend.Repository.EventRepository;
import group3.tgif_backend.Repository.VolunteerRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VolunteerService {

    private final VolunteerRepository volunteerRepository;
    private final EventRepository eventRepository;

    public List<VolunteerDTO> getAll(String userId) {
        return volunteerRepository.findByUserId(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<VolunteerDTO> getAllAdmin() {
        return volunteerRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public VolunteerDTO getById(Long id, String userId) {
        Volunteer v = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        if (!v.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        return mapToDTO(v);
    }

    public VolunteerDTO create(VolunteerDTO dto, String userId) {

        if (volunteerRepository.existsByEmailAndEventId(dto.getEmail(), dto.getEventId())) {
            throw new RuntimeException("Already registered as volunteer");
        }

        Event event = eventRepository.findById(dto.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Volunteer v = Volunteer.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .role(dto.getRole())
                .createdAt(ZonedDateTime.from(LocalDateTime.now()))
                .userId(userId)
                .event(event)
                .build();

        return mapToDTO(volunteerRepository.save(v));
    }

    public VolunteerDTO update(Long id, VolunteerDTO dto, String userId) {
        Volunteer v = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        if (!v.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        if (dto.getName() != null) v.setName(dto.getName());
        if (dto.getEmail() != null) v.setEmail(dto.getEmail());
        if (dto.getPhone() != null) v.setPhone(dto.getPhone());
        if (dto.getRole() != null) v.setRole(dto.getRole());

        return mapToDTO(volunteerRepository.save(v));
    }

    public void delete(Long id, String userId) {
        Volunteer v = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        if (!v.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        volunteerRepository.delete(v);
    }

    private VolunteerDTO mapToDTO(Volunteer v) {
        return VolunteerDTO.builder()
                .id(v.getId())
                .userId(v.getUserId())
                .eventId(v.getEvent().getId())
                .name(v.getName())
                .email(v.getEmail())
                .phone(v.getPhone())
                .role(v.getRole())
                .createdAt(v.getCreatedAt().toLocalDateTime())
                .build();
    }

    public VolunteerDTO createPublic(VolunteerDTO dto) {

        if (volunteerRepository.existsByEmailAndEventId(dto.getEmail(), dto.getEventId())) {
            throw new RuntimeException("Already registered as volunteer");
        }

        Event event = eventRepository.findById(dto.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Volunteer v = Volunteer.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .role(dto.getRole())
                .createdAt(ZonedDateTime.from(LocalDateTime.now()))
                .userId(null) // 🔥 No user (public request)
                .event(event)
                .build();

        return mapToDTO(volunteerRepository.save(v));
    }

}