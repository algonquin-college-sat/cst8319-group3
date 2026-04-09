package group3.tgif_backend.Repository;


import group3.tgif_backend.Model.OIDCState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface OIDCStateRepository extends JpaRepository<OIDCState, Integer> {
    // Critical for OIDC flow: find the record by the state string
    Optional<OIDCState> findByState(String state);
}
