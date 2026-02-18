package group3.tgif_backend.Repository;
import group3.tgif_backend.Model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByActiveTrueAndEventDateGreaterThanEqual(LocalDate today);
}