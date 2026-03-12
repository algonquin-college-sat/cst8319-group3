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
import java.util.Optional;

@Service
@Slf4j
public class RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Transactional
    public Registration create(RegistrationData data, String userId) {
        Registration reg = Registration.builder()
                .userId(userId)
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
        if ("user_id".equals(fieldName)) {
            return registrationRepository.findByUserId((String) fieldValue);
        } else if ("event_id".equals(fieldName)) {
            return registrationRepository.findByEventId(Integer.parseInt(fieldValue.toString()));
        }
        return registrationRepository.findAll(); // Fallback
    }

    @Transactional
    public Optional<Registration> update(Integer id, RegistrationUpdateData data) {
        return registrationRepository.findById(id).map(reg -> {
            if (data.getFirstName() != null) reg.setFirstName(data.getFirstName());
            if (data.getLastName() != null) reg.setLastName(data.getLastName());
            if (data.getEmail() != null) reg.setEmail(data.getEmail());
            if (data.getPaymentStatus() != null) reg.setPaymentStatus(data.getPaymentStatus());
            if (data.getEventId() != null) reg.setEventId(data.getEventId());
            return registrationRepository.save(reg);
        });
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