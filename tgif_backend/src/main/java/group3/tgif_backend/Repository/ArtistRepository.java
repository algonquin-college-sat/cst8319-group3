package group3.tgif_backend.Repository;

import group3.tgif_backend.Model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {
    List<Artist> findByEvent_Id(Long eventId);
}
