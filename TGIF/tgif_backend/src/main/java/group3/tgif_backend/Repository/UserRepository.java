package group3.tgif_backend.Repository;

import group3.tgif_backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // Find user by email (common in auth.py logic)
    Optional<User> findByEmail(String email);
}