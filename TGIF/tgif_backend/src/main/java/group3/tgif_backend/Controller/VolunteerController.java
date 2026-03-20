package group3.tgif_backend.Controller;

import group3.tgif_backend.DTO.VolunteerDTO;
import group3.tgif_backend.Services.VolunteerService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/volunteers")
@RequiredArgsConstructor
@CrossOrigin
public class VolunteerController {

    private final VolunteerService volunteerService;

    // 🔒 User-only
    @GetMapping
    public List<VolunteerDTO> getMyVolunteers(Authentication authentication) {
        String userId = authentication.getName();
        return volunteerService.getAll(userId);
    }

    // 🔓 Admin
    @GetMapping("/all")
    public List<VolunteerDTO> getAll() {
        return volunteerService.getAllAdmin();
    }

    @GetMapping("/{id}")
    public VolunteerDTO getById(@PathVariable Long id, Authentication auth) {
        return volunteerService.getById(id, auth.getName());
    }

    @PostMapping
    public VolunteerDTO create(@RequestBody VolunteerDTO dto) {
        return volunteerService.createPublic(dto);
    }

    @PutMapping("/{id}")
    public VolunteerDTO update(@PathVariable Long id,
                               @RequestBody VolunteerDTO dto,
                               Authentication auth) {
        return volunteerService.update(id, dto, auth.getName());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, Authentication auth) {
        volunteerService.delete(id, auth.getName());
    }
}
