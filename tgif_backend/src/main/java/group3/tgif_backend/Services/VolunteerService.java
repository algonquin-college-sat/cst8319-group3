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



    public List<VolunteerDTO> getAllAdmin() {
        return volunteerRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public VolunteerDTO getById(Long id, String userId) {
        Volunteer v = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));


        return mapToDTO(v);
    }

    public VolunteerDTO create(VolunteerDTO dto, String userId) {


        Volunteer v = Volunteer.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .role(dto.getRole())
                .event(dto.getEvent())
                .availability(dto.getAvailability())
                .experience(dto.getExperience())
                .reason(dto.getReason())
                .build();

        return mapToDTO(volunteerRepository.save(v));
    }

    public VolunteerDTO update(Long id, VolunteerDTO dto, String userId) {

        Volunteer v = new Volunteer();
        if (dto.getName() != null) v.setName(dto.getName());
        if (dto.getEmail() != null) v.setEmail(dto.getEmail());
        if (dto.getPhone() != null) v.setPhone(dto.getPhone());
        if (dto.getRole() != null) v.setRole(dto.getRole());
        if (dto.getAvailability() != null) v.setRole(dto.getAvailability());
        if(dto.getExperience() != null) v.setExperience(dto.getExperience());
        if(dto.getReason() != null) v.setReason(dto.getReason());
        if(dto.getEvent() != null) v.setEvent(dto.getEvent());

        return mapToDTO(volunteerRepository.save(v));
    }

    public void delete(Long id, String userId) {
        Volunteer v = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));


        volunteerRepository.delete(v);
    }

    private VolunteerDTO mapToDTO(Volunteer v) {
        return VolunteerDTO.builder()
                .id(v.getId())
                .event(v.getEvent())
                .name(v.getName())
                .email(v.getEmail())
                .phone(v.getPhone())
                .role(v.getRole())
                .availability(v.getAvailability())
                .experience(v.getExperience())
                .reason(v.getReason())
                .build();
    }

    public VolunteerDTO createPublic(VolunteerDTO dto) {

        if (volunteerRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Already registered as volunteer");
        }


        Volunteer v = Volunteer.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .role(dto.getRole())
                .event(dto.getEvent())
                .availability(dto.getAvailability())
                .experience(dto.getExperience())
                .reason(dto.getReason())
                .build();

        return mapToDTO(volunteerRepository.save(v));
    }

}