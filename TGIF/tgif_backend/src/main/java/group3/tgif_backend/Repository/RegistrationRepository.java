package group3.tgif_backend.Repository;

import group3.tgif_backend.Model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    boolean existsByEmailAndEventId(String email, Long eventId);

    List<Registration> findByEventId(Long eventId);
}

