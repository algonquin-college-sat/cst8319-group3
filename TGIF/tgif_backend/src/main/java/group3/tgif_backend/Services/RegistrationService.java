package group3.tgif_backend.Services;

import group3.tgif_backend.DTO.RegistrationData;
import group3.tgif_backend.DTO.RegistrationUpdateData;
import group3.tgif_backend.Model.Registration;
import group3.tgif_backend.Repository.RegistrationRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;

@Service
@Slf4j
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Transactional
    public Registration create(RegistrationData data) {
        Registration reg = Registration.builder()
                .eventId(data.getEventId())
                .firstName(data.getFirstName())
                .lastName(data.getLastName())
                .email(data.getEmail())
                .paymentStatus(data.getPaymentStatus() != null ? data.getPaymentStatus() : "pending")
                .createdAt(data.getCreatedAt() != null ? data.getCreatedAt() : ZonedDateTime.now())
                .build();
        return registrationRepository.save(reg);
    }

    // 1:1 with list_by_field
    public List<Registration> listByField(String fieldName, Object fieldValue) {
        if ("event_id".equals(fieldName)) {
            return registrationRepository.findByEventId(Integer.parseInt(fieldValue.toString()));
        }
        return registrationRepository.findAll(); // Fallback
    }

    @Transactional
    public Registration update(RegistrationUpdateData data) {
            Registration reg = new Registration();
            if (data.getFirstName() != null) reg.setFirstName(data.getFirstName());
            if (data.getLastName() != null) reg.setLastName(data.getLastName());
            if (data.getEmail() != null) reg.setEmail(data.getEmail());
            if (data.getPaymentStatus() != null) reg.setPaymentStatus(data.getPaymentStatus());
            if (data.getEventId() != null) reg.setEventId(data.getEventId());
            return registrationRepository.save(reg);

    }

    @Transactional
    public boolean delete(Integer id, String userId) {
        // Ownership check built into the query
        return registrationRepository.findByIdAndUserId(id, userId).map(reg -> {
            registrationRepository.delete(reg);
            return true;
        }).orElse(false);
    }

    public boolean checkOwnership(Integer id, String userId) {
        return registrationRepository.findByIdAndUserId(id, userId).isPresent();
    }
}