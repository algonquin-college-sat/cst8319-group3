package group3.tgif_backend.Controller;

import group3.tgif_backend.DTO.RegistrationData;
import group3.tgif_backend.DTO.RegistrationUpdateData;
import group3.tgif_backend.Model.Registration;
import group3.tgif_backend.Services.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registration")
@CrossOrigin
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @GetMapping("/list")
    public List<Registration> list(@RequestParam(required = false) String field_name,
                                   @RequestParam(required = false) String field_value,
                                   @RequestAttribute("currentUserId") String userId) {
        // If no field specified, default to current user's registrations
        if (field_name == null) {
            return registrationService.listByField("user_id", userId);
        }
        return registrationService.listByField(field_name, field_value);
    }

    @PostMapping("/user")
    public Registration create(@RequestBody RegistrationData data, @RequestAttribute("currentUserId") String userId) {
        return registrationService.create(data, userId);
    }

    @PutMapping("/{id}")
    public Registration update(@PathVariable Integer id,
                               @RequestBody RegistrationUpdateData data,
                               @RequestAttribute("currentUserId") String userId) {
        if (!registrationService.checkOwnership(id, userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }
        return registrationService.update(id, data)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable Integer id, @RequestAttribute("currentUserId") String userId) {
        if (!registrationService.delete(id, userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized or not found");
        }
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Registration deleted successfully");
        response.put("id", id);
        return response;
    }
}