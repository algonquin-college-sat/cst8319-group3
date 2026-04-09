package group3.tgif_backend.Services;

import group3.tgif_backend.Model.User;
import group3.tgif_backend.Repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
@Slf4j
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public User getOrCreateUser(String platformSub, String email, String name) {
        log.debug("[DB_OP] Starting get_or_create_user - platform_sub: {}", platformSub);

        return userRepository.findById(platformSub)
                .map(user -> {
                    user.setEmail(email);
                    user.setName(name);
                    user.setLastLogin(ZonedDateTime.now());
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setId(platformSub);
                    newUser.setEmail(email);
                    newUser.setName(name);
                    newUser.setLastLogin(ZonedDateTime.now());
                    return userRepository.save(newUser);
                });
    }
}