package group3.tgif_backend.Repository;
import group3.tgif_backend.Model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Integer> {
    List<Volunteer> findByEventId(Integer eventId);
}
