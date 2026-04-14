package group3.tgif_backend.Controller;

import group3.tgif_backend.DTO.RegistrationData;
import group3.tgif_backend.DTO.RegistrationUpdateData;
import group3.tgif_backend.Model.Registration;
import group3.tgif_backend.Services.RegistrationService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registration") // ✅ unchanged
@CrossOrigin(origins = "http://localhost:3000")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    // ===============================
    // ✅ LIST
    // ===============================
    @GetMapping("/list")
    public List<Registration> list(
            @RequestParam(required = false) String field_name,
            @RequestParam(required = false) String field_value
    ) {

        if (field_name == null || field_value == null) {
            return registrationService.listByField(null, null);
        }

        return registrationService.listByField(field_name, field_value);
    }

    // ===============================
    // ✅ CREATE (PUBLIC)
    // ===============================
    @PostMapping() // ✅ unchanged
    public Registration create(@Valid @RequestBody RegistrationData data) {
        return registrationService.create(data);
    }

    // ===============================
    // ✅ UPDATE
    // ===============================
    @PutMapping("/{id}")
    public Registration update(
            @PathVariable Integer id,
            @RequestBody RegistrationUpdateData data
    ) {
        return registrationService.update(id, data);
    }

    // ===============================
    // ✅ DELETE
    // ===============================
    @DeleteMapping("/{id}")
    public Map<String, Object> delete(@PathVariable Integer id) {

        if (!registrationService.delete(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Registration not found");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Registration deleted successfully");
        response.put("id", id);

        return response;
    }

    @PutMapping("/{id}/pay")
    public Registration markAsPaid(@PathVariable Integer id) {
        return registrationService.markAsPaid(id);
    }
}