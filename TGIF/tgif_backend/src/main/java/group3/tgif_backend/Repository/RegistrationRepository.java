package group3.tgif_backend.Repository;

import group3.tgif_backend.Model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Integer> {
    List<Registration> findByUserId(String userId);
    List<Registration> findByEventId(Integer eventId);
    Optional<Registration> findByIdAndUserId(Integer id, String userId);
}
