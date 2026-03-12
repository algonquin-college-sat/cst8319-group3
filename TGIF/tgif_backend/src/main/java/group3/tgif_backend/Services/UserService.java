package group3.tgif_backend.Services;

import group3.tgif_backend.Model.User;
import group3.tgif_backend.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserProfile(String userId) {
        log.debug("[DB_OP] Starting get_user_profile - user_id: {}", userId);
        return userRepository.findById(userId);
    }

    @Transactional
    public Optional<User> updateUserProfile(String userId, String name) {
        return userRepository.findById(userId).map(user -> {
            user.setName(name);
            return userRepository.save(user);
        });
    }
}
