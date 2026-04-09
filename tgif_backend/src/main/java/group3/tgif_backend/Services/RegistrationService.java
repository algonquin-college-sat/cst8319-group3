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

        // ✅ Prevent duplicate registration
        if (registrationRepository
                .findByEmailAndEventId(data.getEmail(), data.getEventId())
                .isPresent()) {

            throw new RuntimeException("Already registered for this event");
        }

        Registration reg = Registration.builder()
                .eventId(data.getEventId())
                .firstName(data.getFirstName())
                .lastName(data.getLastName())
                .email(data.getEmail())
                .paymentStatus("PENDING") // ✅ enforce here
                .build();

        return registrationRepository.save(reg);
    }

    public List<Registration> listByField(String fieldName, Object fieldValue) {

        if ("event_id".equals(fieldName)) {
            return registrationRepository.findByEventId(Integer.parseInt(fieldValue.toString()));
        }

        if ("email".equals(fieldName)) {
            return registrationRepository.findByEmail(fieldValue.toString());
        }

        return registrationRepository.findAll();
    }

    @Transactional
    public Registration markAsPaid(Integer id) {

        Registration reg = registrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        reg.setPaymentStatus("PAID");

        return registrationRepository.save(reg);
    }

    @Transactional
    public Registration update(Integer id, RegistrationUpdateData data) {

        Registration reg = registrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registration not found"));

        if (data.getFirstName() != null) reg.setFirstName(data.getFirstName());
        if (data.getLastName() != null) reg.setLastName(data.getLastName());
        if (data.getEmail() != null) reg.setEmail(data.getEmail());
        if (data.getPaymentStatus() != null) reg.setPaymentStatus(data.getPaymentStatus());

        return registrationRepository.save(reg);
    }

    @Transactional
    public boolean delete(Integer id) {

        if (!registrationRepository.existsById(id)) {
            return false;
        }

        registrationRepository.deleteById(id);
        return true;
    }
}