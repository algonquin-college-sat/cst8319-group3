package group3.tgif_backend.Services;

import group3.tgif_backend.Model.User;
import group3.tgif_backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 🔹 Create new user (email/password)
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // 🔹 Authenticate user (email/password)
    public Optional<User> authenticate(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) return Optional.empty();

        User user = userOpt.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return Optional.empty();
        }

        return Optional.of(user);
    }

    // 🔹 Get user profile by ID
    public Optional<User> getUserProfile(String id) {
        return userRepository.findById(id);
    }

    // 🔹 Update user profile
    public Optional<User> updateUserProfile(String id, String name) {
        Optional<User> userOpt = userRepository.findById(id);

        if (userOpt.isEmpty()) return Optional.empty();

        User user = userOpt.get();
        user.setName(name);
        userRepository.save(user);

        return Optional.of(user);
    }

    // 🔹 Optional: Get all users (CRUD)
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 🔹 Optional: Delete user by ID
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}