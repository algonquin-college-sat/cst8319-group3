package group3.tgif_backend.Controller;

import group3.tgif_backend.DTO.RegistrationDTO;
import group3.tgif_backend.Services.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
@RequiredArgsConstructor
@CrossOrigin
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    public RegistrationDTO register(@RequestBody RegistrationDTO dto) {
        return registrationService.register(dto);
    }

    @GetMapping("/event/{eventId}")
    public List<RegistrationDTO> getByEvent(@PathVariable Long eventId) {
        return registrationService.getRegistrationsByEvent(eventId);
    }
}

